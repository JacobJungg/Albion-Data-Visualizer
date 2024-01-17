import dash
from dash import html, dcc, Input, Output
from data_fetcher import fetch_data

DATA = fetch_data()

LOCATIONS = ['Lymhurst', 'Bridgewatch', 'Thetford', 'Fort Sterling']

def create_layout(unique_items):
    items_options = [{'label': item, 'value': item} for item in unique_items]

    app = dash.Dash(__name__)

    app.layout = html.Div([
        dcc.Dropdown(
            id='dropdown-menu',
            options=items_options,
            value='T5_PLANKS',
            style={'width': '50%'}
        ), 
        html.Div(id="output-container"),

        html.Div([
            *[html.H3(location, style={"color": "grey"}) for location in LOCATIONS],
        ], className='albion_main-container', style={'display': 'flex', 'justify-content':'space-between'}),
        
        html.Div([
            html.H2(id='lymhurst-price'),
            html.H2(id='bridgewatch-price'),
            html.H2(id='thetford-price'),
            html.H2(id='fort_sterling-price')
        ], className='albion_main-contaienr',style={'display': 'flex', 'justify-content':'space-between'}),
    ])

    @app.callback(
        [Output('output-container', 'children')] +
        [Output(f'{location.lower().replace(".", "").replace(" ", "_")}-price', "children") for location in LOCATIONS],
        [Input('dropdown-menu', 'value')]
    )
    def update_prices(selected_item):
        price_outputs = []
        selected_item_data = [item for item in DATA if item['Item Name'] == selected_item]

        if selected_item_data:
            price_outputs.append(f"Price: {selected_item_data[0]['Price']}")
            for location in LOCATIONS:
                location_data = next((item for item in selected_item_data if item['Location'] == location), None)
                if location_data:
                    price_outputs.append(location_data['Price'])
                else:
                    price_outputs.append("Price: N/A")
        else:
            price_outputs = ["Price: N/A"] * (len(LOCATIONS) + 1)

        return price_outputs

    return app

if __name__ == "__main__":
    unique_items = set(item['Item Name'] for item in DATA)
    app = create_layout(unique_items)
    app.run_server(debug=True)
