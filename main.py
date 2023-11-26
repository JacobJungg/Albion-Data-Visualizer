import dash
from dash import html, dcc, Input, Output
import requests
PRICE_URL = "https://www.albion-online-data.com/api/v2/stats/prices/"

LOCATIONS = ['Lymhusrt', 'Bridgewatch', 'Thetford', 'Fort Sterling']

QUALITY = '0'

ITEMS_OF_INTREST = ['T5_PLANKS', "T4_MEAL_SALAD"]

DATA = []

for location in LOCATIONS:
    for item in ITEMS_OF_INTREST:
        request = requests.get(PRICE_URL + item +'.json?&locations=' + location + '&qualities=' + QUALITY)
        price = request.json()[0]["sell_price_min"]
        DATA.append ({"Location": location, "Item Name": item, "Price": price})

print(DATA)