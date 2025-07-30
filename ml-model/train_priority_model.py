# train_priority_model.py
import joblib
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Sample training data
texts = [
    # High Priority (Payment, Refund, Money)
    "I want a refund",
    "Payment failed",
    "Not received my money",
    "I can’t pay for the product",
    "I was charged twice",
    "Refund still not processed",
    "Payment gateway not working",
    
    # Medium Priority (Delivery, Damage)
    "Delivery is late",
    "Product was delivered to the wrong address",
    "Damaged product received",
    "I got the wrong item",
    "The item is defective",
    
    # Low Priority (General Info)
    "How to change address?",
    "Need product info",
    "What colors are available?",
    "Can I track my order?",
    "Is there a warranty?",
    "This product is very well made",
    "Do you ship internationally?"
]

labels = [
    "High", "High", "High", "High", "High", "High", "High",  # Payment-related
    "Medium", "Medium", "Medium", "Medium", "Medium",        # Delivery/damage
    "Low", "Low", "Low", "Low", "Low", "Low", "Low"          # Info/general
]

# Build pipeline
model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', LogisticRegression())
])

model.fit(texts, labels)

# Save model
joblib.dump(model, "priority_model.pkl")
