import dotenv from 'dotenv';
import { LangChainStream, StreamingTextResponse } from 'ai';
import { CallbackManager } from 'langchain/callbacks';
import { Replicate } from 'langchain/llms/replicate';
import { NextResponse } from 'next/server';

import { MemoryManager } from '@/lib/memory';
import prismadb from '@/lib/prismadb';
import { rateLimit } from '@/lib/rate-limit';

dotenv.config({ path: `.env` });

export async function POST(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const { prompt } = await req.json();
    const user = await currentUser();
    if (!user || !user.firstName || !user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const identifier = req.url + '-' + user.id;
    const { success } = await rateLimit(identifier);
    if (!success) {
      return new NextResponse('Rate limit exceeded', { status: 429 });
    }

    const item = await prismadb.item.update({
      where: {
        id: params.chatId,
      },
      data: {
        messages: {
          create: {
            content: prompt,
            role: 'user',
            userId: user.id,
          },
        },
      },
    });

    if (!item) {
      return new NextResponse('item not found', { status: 404 });
    }

    const name = item.id;
    const item_file_name = name + '.txt';

    const itemKey = {
        itemName: name!,
      userId: user.id,
      modelName: 'llama2-13b',
    };
    const memoryManager = await MemoryManager.getInstance();
    const records = await memoryManager.readLatestHistory(itemKey);
    if (records.length === 0) {
      await memoryManager.seedChatHistory(item.seed, '\n\n', itemKey);
    }
    await memoryManager.writeToHistory('User: ' + prompt + '\n', itemKey);

    const recentChatHistory = await memoryManager.readLatestHistory(
        itemKey
    );
    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      item_file_name
    );

    let relevantHistory = '';
    if (!!similarDocs && similarDocs.length !== 0) {
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join('\n');
    }

    const { handlers } = LangChainStream();
    const model = new Replicate({
      model:
        'a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
      input: {
        max_length: 2048,
      },
      apiKey: process.env.REPLICATE_API_TOKEN,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });

    model.verbose = true;
    const resp = String(
      await model
        .call(
          `
          ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${item.name}: prefix. 
  
          ${item.instructions}
  
          Below are relevant details about ${item.name}'s past and the conversation you are in.
          ${relevantHistory}
  
  
          ${recentChatHistory}\n${item.name}:`
        )
        .catch(console.error)
    );
    const cleaned = resp.replaceAll(',', '');
    const chunks = cleaned.split('\n');
    const response = chunks[0];

    await memoryManager.writeToHistory('' + response.trim(), itemKey);
    var Readable = require('stream').Readable;

    let s = new Readable();
    s.push(response);
    s.push(null);
    if (response !== undefined && response.length > 1) {
      memoryManager.writeToHistory('' + response.trim(), itemKey);

      await prismadb.item.update({
        where: {
          id: params.chatId,
        },
        data: {
          messages: {
            create: {
              content: response.trim(),
              role: 'system',
              userId: user.id,
            },
          },
        },
      });
    }

    return new StreamingTextResponse(s);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}