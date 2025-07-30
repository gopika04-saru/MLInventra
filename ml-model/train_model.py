import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
import joblib

# Dummy data
data = [
    {"name": "Sunset painting", "category": "Paintings", "price": 1500},
    {"name": "Abstract sketch", "category": "Sketches & Drawings", "price": 700},
    {"name": "Clay pot design", "category": "Earthen Pot Art", "price": 1200},
    {"name": "Thread wall art", "category": "Thread & Yarn Decor", "price": 1000},
    {"name": "Handmade earrings", "category": "Artisan Jewelry", "price": 800},
    {"name": "Calligraphy quote", "category": "Calligraphy & Typography", "price": 600},
    {"name": "Mandala canvas", "category": "Mandala & Dot Art", "price": 1300},
    {"name": "Handicrafts & Decor", "category": "Handicrafts & Decor", "price": 400},
    # Add more dummy samples
]

df = pd.DataFrame(data)
df["text"] = df["name"] + " " + df["category"]

# Create a pipeline
model = make_pipeline(
    TfidfVectorizer(),
    LinearRegression()
)

model.fit(df["text"], df["price"])

# Save model
joblib.dump(model, "price_model.pkl")
print("Model trained and saved.")
