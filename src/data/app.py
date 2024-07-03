from flask import Flask, request, jsonify, send_from_directory
import pandas as pd
from data_fetcher import fetch_data

app = Flask(__name__, static_folder='frontend/build')

# Fetch data and convert to DataFrame
DATA = fetch_data()
df = pd.DataFrame(DATA)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

@app.route('/get_price', methods=['POST'])
def get_price():
    data = request.get_json()
    item_name = data.get('item_name')
    price_type = data.get('price_type')

    if not item_name or not price_type:
        return jsonify({'error': 'Missing data'}), 400

    if price_type == 'low':
        price = df[df['Item Name'] == item_name]['Price'].min()
    elif price_type == 'high':
        price = df[df['Item Name'] == item_name]['Price'].max()
    else:
        return jsonify({'error': 'Invalid price type'}), 400

    if pd.isna(price):
        return jsonify({'error': 'No data available for the item'}), 404

    return jsonify({'price': price})

if __name__ == '__main__':
    app.run(debug=True)
