from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import joblib
import pandas as pd

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model + scaler
model = joblib.load("models/model.pkl")
scaler = joblib.load("models/scaler.pkl")

THRESHOLD = 0.35


@app.get("/")
def home():
    return {"message": "PneumoScan AI API Running"}


@app.post("/predict")
def predict(data: dict):

    try:

        # Base features
        input_data = {
            "fever": data["fever"],
            "tachycardia": data["tachycardia"],
            "crackles": data["crackles"],
            "oxygen_saturation": data["oxygen_saturation"],
            "wbc_count": data["wbc_count"],

            # One-hot encoded X-ray columns
            "chest_xray_result_consolidation": 0,
            "chest_xray_result_effusion": 0,
            "chest_xray_result_infiltrate": 0,
            "chest_xray_result_normal": 0,
            "chest_xray_result_opacity": 0,
        }

        # Turn selected xray into 1
        xray_value = data.get("chest_xray_result", "normal")

        column_name = f"chest_xray_result_{xray_value}"

        if column_name in input_data:
            input_data[column_name] = 1

        # Convert to dataframe
        df = pd.DataFrame([input_data])

        # Scale
        scaled = scaler.transform(df)

        # Predict
        probability = model.predict_proba(scaled)[0][1]

        prediction = (
            "PNEUMONIA"
            if probability >= THRESHOLD
            else "NOT PNEUMONIA"
        )

        return {
            "prediction": prediction,
            "probability": float(probability)
        }

    except Exception as e:

        return {
            "error": str(e)
        }