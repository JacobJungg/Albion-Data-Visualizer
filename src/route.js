import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'items.txt'); // Adjust the path
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const items = fileContent.split('\n').map(line => {
    const parts = line.split(':');
    if (parts.length === 2) {
      return {
        label: parts[1].trim(),
        value: parts[1].trim()
      };
    }
    return null;
  }).filter(Boolean);

  return NextResponse.json(items);
}
