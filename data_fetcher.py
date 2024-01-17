import requests

PRICE_URL = "https://www.albion-online-data.com/api/v2/stats/prices/"

LOCATIONS = ['Lymhurst', 'Bridgewatch', 'Thetford', 'Fort Sterling']

QUALITY = '0'

ITEMS_OF_INTREST = ["T4_CAPEITEM_FW_LYMHURST@1", "T4_CAPEITEM_FW_LYMHURST@3"]

DATA = []

def fetch_data():
    for location in LOCATIONS:
        for item in ITEMS_OF_INTREST:
            request = requests.get(PRICE_URL + item + '.json?&locations=' + location + '&qualities=' + QUALITY)
            price = request.json()[0]["sell_price_min"]
            DATA.append({"Location": location, "Item Name": item, "Price": price})
    print(DATA)

    return DATA  # Add this line to return the data

