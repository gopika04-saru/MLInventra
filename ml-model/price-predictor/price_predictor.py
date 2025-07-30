from flask import Flask, request, jsonify
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)

# Dummy model training (replace with real dataset later)
model = LinearRegression()
X = np.array([[1], [2], [3]])  # dummy features like category id
y = np.array([100, 200, 300])  # dummy prices
model.fit(X, y)

@app.route("/predict-price", methods=["POST"])
def predict_price():
    data = request.get_json()
    category = data.get("categoryId", 1)
    
    # Predict price using ML model
    predicted_price = model.predict([[category]])[0]
    return jsonify({"predictedPrice": round(predicted_price, 2)})

if __name__ == "__main__":
    app.run(port=5000)
