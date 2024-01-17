import dash
from dash import html, dcc, Input, Output
import requests
PRICE_URL = "https://www.albion-online-data.com/api/v2/stats/prices/"

LOCATIONS = ['Lymhurst', 'Bridgewatch', 'Thetford', 'Fort Sterling']

QUALITY = '0'

ITEMS_OF_INTREST = ["T4_CAPEITEM_FW_LYMHURST@1", "T4_CAPEITEM_FW_LYMHURST@3"]

DATA = []

for location in LOCATIONS:
    for item in ITEMS_OF_INTREST:
        request = requests.get(PRICE_URL + item +'.json?&locations=' + location + '&qualities=' + QUALITY)
        price = request.json()[0]["sell_price_min"]
        DATA.append ({"Location": location, "Item Name": item, "Price": price})


unique_items = set(item['Item Name'] for item in DATA)
items_options = [{'label': item, 'value':item} for item in unique_items]

print(items_options)

app = dash.Dash(__name__)

app.layout = html.Div([
    dcc.Dropdown(
        id = 'dropdown-menu',
        options = items_options,
        value='T5_PLANKS',
        style={'width': '50%'}
    ), html.Div(id="output-container"),

    html.Div([
        *[html.H3(location, style={"color":"grey"}) for location in LOCATIONS],

    ], className='albion_main-container', style={'display': 'flex', 'justify-content':'space-between'}),
    
    html.Div([
        html.H2(id='lymhurst-price'),
        html.H2(id='bridgewatch-price'),
        html.H2(id='thetford-price'),
        html.H2(id='fort_sterling-price')
    ], className='albion_main-contaienr',style={'display': 'flex', 'justify-content':'space-between'}),

])

@app.callback(
    [Output('output-container','children')]+[
        Output(f'{location.lower().replace(".","").replace(" ","_")}-price', "children") for location in LOCATIONS],
    [Input('dropdown-menu', 'value')]
)

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

if __name__ == "__main__":
    app.run_server(debug=True)