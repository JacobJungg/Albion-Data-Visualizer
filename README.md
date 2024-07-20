## Albion Economics is an application that allows users to efficiently use the in-game marketplace by purchasing items at troughs and selling at peaks!

Albion Economics utilizes...
- Shadcn/ui components for a sleek easily maneuverable frontend
- pandas for streamlining items and prices
- AI ChatBot utilizing OpenAI and Pinecone to help users make the most of the marketplace

This code does not include...
- database url
- pinecone index, enviornment or apikey
- upstash redis rest url or rest token
- openai apikey
- replicate apitoken

## Introduction

Albion Online is a MMO RPG game, where every item is unqiue and created by another player. The in game marketplace is utilized to sell items from one location to another resulting in an economical market being created. Items prices fluctuate due to various factors such as waring clans, in game events and shifts in METAs.
## Overview
![image](https://github.com/JacobJungg/Albion-Data-Visualizer/assets/124704749/b79d174c-d927-4359-a5d2-f400c5dd3fbd)

This is the homepage. The middle has a notificaion pannel and a graph pannel for finding profitable items. Users must submit an item at the top first.


![image](https://github.com/JacobJungg/Albion-Data-Visualizer/assets/124704749/bd60696d-a7cc-4243-abba-644e1a8cffe4)

Asking the ChatBot in the bottem right can help users determine which item they will be seeking. Here we ask for items in the city of Lymhurst, and the assistant responds with 'Keeper Ceremonial Candal'

![image](https://github.com/JacobJungg/Albion-Data-Visualizer/assets/124704749/05855fcf-2869-4ccb-bc5f-d525c5ad5cab)

Inputing 'Keeper Ceremonial Candal,' displays the current prices across the four different cities, Thetford, Lymhurst, Bridgewatch and Fort Sterling. Each city has its own market and therefore their own prices. We changed the location to Lymhurst and set a reminder for when the price hits 550 gold.

![image](https://github.com/JacobJungg/Albion-Data-Visualizer/assets/124704749/9db439ad-acf1-4965-b9e0-b32042bb6c83)

In game, we can see the price is 243. We can buy a large amount, and hold them until we get the notification the price has risen to 550.

![image](https://github.com/JacobJungg/Albion-Data-Visualizer/assets/124704749/70694bbf-8a19-4717-8407-dfd560957682)

If we have any doubts, we can check out the history page. Changing the city, and adjusting the time frame allows us to see previous prices and fluctuations.

![image](https://github.com/JacobJungg/Albion-Data-Visualizer/assets/124704749/3f7e65fd-2cba-40c4-8357-18132b5636df)

Here we can see the peak a low on January 10th followed by a spike on January 11th.

![image](https://github.com/JacobJungg/Albion-Data-Visualizer/assets/124704749/490e9162-6669-4c7a-9292-3ad3c7ad6d45)

When we get the notification we can sell all of our items for the new floor price, making a profit!
