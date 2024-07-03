import pandas as pd
from data_tester import fetch_data
from price_tracker import AlbionPriceTracker

def main():
    # Fetch data and convert to DataFrame
    DATA = fetch_data()
    df = pd.DataFrame(DATA)
    
    # Convert 'Date' column to datetime if it's not already
    df['Date'] = pd.to_datetime(df['Date'])
    
    app = AlbionPriceTracker(df)
    app.mainloop()

if __name__ == "__main__":
    main()
