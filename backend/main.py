from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import joblib
import numpy as np

# Load the trained machine learning model
model = joblib.load('../health_risk_model.joblib')

app = FastAPI()
# A new function to generate a dynamic advisory message
def generate_advisory(risk_level: str, score: float):
    if risk_level == "High":
        return f"Immediate action is recommended. With a score of {round(score)}, we've detected significant health risks. Consider consulting a professional and limit outdoor exposure."
    elif risk_level == "Medium":
        return f"Precautionary measures are advised. A score of {round(score)} indicates a moderate risk. Stay aware of your surroundings and check local advisories."
    else: # Low Risk
        return f"Health conditions are stable. With a score of {round(score)}, the risk is low. Continue to monitor for any changes."

# Configure CORS middleware
# This is crucial for allowing your frontend (on a different port) to access the API.
origins = [
    "http://localhost",
    "http://localhost:5173",  # The address of your frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# The original root endpoint
@app.get("/")
def read_root():
    return {"message": "Hello from Alera! The API is working."}

# The mock risk prediction endpoint
@app.get("/predict_risk/{location}")
def predict_risk(location: str):
    return {
        "location": location,
        "risk_level": "Medium",
        "advisory": f"A medium health risk is detected in {location}. Stay informed and take precautions."
    }


# The new endpoint that uses the AI model for a health score
@app.get("/health_score/")
def get_health_score(pollution_index: Optional[int] = 50,
                     symptom_reports: Optional[int] = 10,
                     pollen_level: Optional[int] = 20):
    """
    Uses a pre-trained AI model to calculate a health risk score.
    """
    # Prepare the input data for the model
    input_data = np.array([[pollution_index, symptom_reports, pollen_level]])

    # Use the model to make a prediction
    predicted_score = model.predict(input_data)[0]

    # Convert the score to a risk level
    risk_level = "Low"
    if predicted_score > 80:
        risk_level = "High"
    elif predicted_score > 50:
        risk_level = "Medium"

    return {
    "score": predicted_score,
    "risk_level": risk_level,
    "advisory": generate_advisory(risk_level, predicted_score)
}