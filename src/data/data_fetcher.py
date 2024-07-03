import requests

PRICE_URL = "https://www.albion-online-data.com/api/v2/stats/prices/"

LOCATIONS = ['Lymhurst', 'Bridgewatch', 'Thetford', 'Fort Sterling']

def fetch_data():
    for location in LOCATIONS:
        for item in ITEMS_OF_INTREST:
            request = requests.get(PRICE_URL + item + '.json?&locations=' + location + '&qualities=' + QUALITY)
            price = request.json()[0]["sell_price_min"]
            DATA.append({"Location": location, "Item Name": item, "Price": price})
    print(DATA)

    return DATA

def update_prices(selected_item):
    price_outputs = []
    selected_item_data = [item for item in DATA if item['Item Name'] == selected_item]

    if selected_item_data:
        price_outputs.append(f"Price: {selected_item_data[0]['Price']}")
        for location in LOCATIONS:
            location_data = next((item for item in selected_item_data if item['Location']== location), None)
            if location_data:
                price_outputs.append(location_data['Price'])
            else:
                price_outputs.append("Price: N/A")
    else:
        price_outputs = ["Price: N/A"] * (len(LOCATIONS) + 1)
    print(price_outputs)
    return price_outputs