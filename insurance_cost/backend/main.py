import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

app = FastAPI()

# Base directory of this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# FRONTEND_DIR is sibling of backend
FRONTEND_DIR = os.path.join(BASE_DIR, "../frontend")

# Mount frontend folder
app.mount("/frontend", StaticFiles(directory=FRONTEND_DIR), name="frontend")

# Serve main.html
@app.get("/")
def read_index():
    return FileResponse(os.path.join(FRONTEND_DIR, "main.html"))

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model_path = os.path.join(BASE_DIR, "model.pkl")
model = joblib.load(model_path)

# Input schema
class InsuranceInput(BaseModel):
    age: int
    gender: str
    bmi: float
    children: int
    smoker: str
    region: str

# Prediction endpoint
@app.post("/predict")
def predict(data: InsuranceInput):
    gender = 1 if data.gender.lower() == "male" else 0
    smoker = 1 if data.smoker.lower() == "yes" else 0
    region_map = {"southeast":0, "southwest":1, "northwest":2, "northeast":3}
    region = region_map[data.region.lower()]
    prediction = model.predict([[data.age, gender, data.bmi, data.children, smoker, region]])
    return {"predicted_cost": round(float(prediction[0]),2)}
