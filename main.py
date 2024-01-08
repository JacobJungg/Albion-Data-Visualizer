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

unique_items = set(item['Item name'] for item in DATA)
items_options = [{'label': item, 'value':item} for item in unique_items]

print(items_options)

app = dash.Dash(__name__)

app.layout = html.Div([
    dcc.Dropdown(
        id = 'dropdownmenu'
        options = items_options,
        value='T5_PLANKS',
        style={'width': '50%'}
    ), html.Div(id="output-container"),

    html.Div([
        *[html.H3(location, style={"color":"grey"}) for location in LOCATIONS],

    ], classname='albion_main-container', style={'display': 'flex', 'justify-content':'space-between'}),
    
    html.Div([
        html.H2(id='lymhurst-price'),
        html.H2(id='bridgewatch-price'),
        html.H2(id='thetford-price'),
        html.H2(id='fort-sterling-price')
    ], className='albion_main-contaienr',style={'display': 'flex', 'justify-content':'space-between'}),


])

@app.callback(
    [Output('output-container','children')]+[
        Output(f'{location.lower().replace(".","").replace(" ","_")}-price', "children") for lcoation in LOCATIONS],
    [Input('dropdown-menu', 'value')]
)