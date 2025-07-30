# train_priority_model.py
import joblib
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Sample training data
texts = [
    # 🔴 High Priority (Payment, Refund, Money Issues)
    "I want a refund",
    "Payment failed",
    "Not received my money",
    "I can’t pay for the product",
    "I was charged twice",
    "Refund still not processed",
    "Payment gateway not working",
    "Payment is very slow",
    "My transaction was declined",
    "I lost money during payment",
    "Amount was deducted but no order placed",
    "Bank shows payment but order not confirmed",
    "Refund taking too long",
    "Payment confirmation not received",
    "I need immediate help with my payment",
    "Money debited but order not showing",
    "My wallet got charged twice",
    "I made a double payment accidentally",
    "I cancelled but still got charged",
    "Why is my refund taking forever?",

    # 🟠 Medium Priority (Delivery, Damaged Item, Wrong Product)
    "Delivery is late",
    "Product was delivered to the wrong address",
    "Damaged product received",
    "I got the wrong item",
    "The item is defective",
    "Courier didn't call before delivery",
    "My order tracking is stuck",
    "Parcel returned without attempt",
    "Delivery guy was rude",
    "Package is open and items missing",
    "Item is broken on arrival",
    "Packaging was poor",
    "I received an empty box",
    "Order was cancelled without reason",
    "Still waiting for my product",
    "Delivery partner didn't come",
    "No update on shipment",
    "Wrong size delivered",
    "Missing accessories with product",
    "I was home but status shows delivery failed",

    # 🟢 Low Priority (General Info, Queries, Feedback)
    "How to change address?",
    "Need product info",
    "What colors are available?",
    "Can I track my order?",
    "Is there a warranty?",
    "This product is very well made",
    "Do you ship internationally?",
    "How to cancel my order?",
    "Can I get a discount?",
    "Do you offer gift wrapping?",
    "Can I pay via COD?",
    "What is the return policy?",
    "Is there EMI available?",
    "When will it be back in stock?",
    "Do you have a store near me?",
    "How to contact customer care?",
    "Can I get installation help?",
    "Can I pre-order this item?",
    "What’s the estimated delivery date?",
    "Are there user reviews for this product?"
]

labels = [
    # High (20)
    "High", "High", "High", "High", "High", "High", "High", "High",
    "High", "High", "High", "High", "High", "High", "High", "High",
    "High", "High", "High", "High",

    # Medium (20)
    "Medium", "Medium", "Medium", "Medium", "Medium", "Medium", "Medium", "Medium",
    "Medium", "Medium", "Medium", "Medium", "Medium", "Medium", "Medium", "Medium",
    "Medium", "Medium", "Medium", "Medium",

    # Low (20)
    "Low", "Low", "Low", "Low", "Low", "Low", "Low", "Low",
    "Low", "Low", "Low", "Low", "Low", "Low", "Low", "Low",
    "Low", "Low", "Low", "Low"
]

# Build pipeline
model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', LogisticRegression())
])

model.fit(texts, labels)

# Save model
joblib.dump(model, "priority_model.pkl")
