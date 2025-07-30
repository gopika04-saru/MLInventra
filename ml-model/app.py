from flask import Flask, request, jsonify
import joblib
import datetime
from prophet import Prophet
import pandas as pd
import random
from datetime import datetime, timedelta

app = Flask(__name__)
model = joblib.load("price_model.pkl")
priority_model = joblib.load("priority_model.pkl")


# Dummy stock data generator
# -------------------------------
def create_dummy_data(product_id):
    today = datetime.today()
    dates = [today - timedelta(days=i) for i in range(30)][::-1]
    quantities = [max(0, 50 - i + random.randint(-2, 2)) for i in range(30)]

    return pd.DataFrame({
        "ds": dates,
        "y": quantities
    })

@app.route("/predict-price", methods=["POST"])
def predict_price():
    data = request.get_json()  
    name = data.get("name")
    category = data.get("category")

    if not name or not category:
        return jsonify({"error": "Missing fields"}), 400

    input_text = name + " " + category
    price = model.predict([input_text])[0]
    return jsonify({"predicted_price": round(price, 2)})

@app.route("/predict-priority", methods=["POST"])
def predict_priority():
    data = request.get_json()
    message = data.get("message", "")
    
    if not message:
        return jsonify({"error": "Message is required"}), 400

    prediction = priority_model.predict([message])[0]
    return jsonify({"priority": prediction})

# Predict Stock Forecast
# -------------------------------
@app.route('/predict-stock', methods=['POST'])
def predict_stock():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 50)

    if quantity == 0:
        return jsonify({
            "predicted_date": "NA",
            "predicted_days": 0,
            "predicted_quantity": 50,
            "product_id": product_id
        })

    df = create_dummy_data(product_id)
    model_prophet = Prophet()
    model_prophet.fit(df)

    future = model_prophet.make_future_dataframe(periods=10)
    forecast = model_prophet.predict(future)

    for i in range(len(forecast)):
        if forecast.iloc[i]['yhat'] < 10:
            predicted_date = forecast.iloc[i]['ds'].date().isoformat()
            predicted_quantity = round(forecast.iloc[i]['yhat'], 2)
            predicted_days = (forecast.iloc[i]['ds'].date() - datetime.today().date()).days
            return jsonify({
                "predicted_date": predicted_date,
                "predicted_days": predicted_days,
                "predicted_quantity": predicted_quantity,
                "product_id": product_id
            })

    return jsonify({
        "message": "Stock remains healthy",
        "product_id": product_id
    })


if __name__ == "__main__":
    app.run(port=5000, debug=True)
