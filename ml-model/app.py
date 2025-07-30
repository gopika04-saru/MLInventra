from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load("price_model.pkl")
priority_model = joblib.load("priority_model.pkl")


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


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
