from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np

# Initialize the FastAPI app
app = FastAPI()

# Load the phishing detection model
with open('model/phishing_classifier.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Define a Pydantic model for input validation
class URLData(BaseModel):
    url: str

# Dummy function to simulate phishing detection logic
def detect_phishing(url: str):
    # Add your real phishing detection logic here
    # For now, we simulate with a random response
    # Use the model to predict, this is just a placeholder
    # Example: return model.predict(...) 
    return np.random.choice(["safe", "phishing"], p=[0.8, 0.2]), np.random.randint(0, 100)

# Define the /detect_phishing endpoint
@app.post("/detect_phishing")
async def phishing_detection(url_data: URLData):
    url = url_data.url
    status, danger_level = detect_phishing(url)
    
    return {
        "url": url,
        "status": status,
        "danger_level": danger_level
    }

# Run the server with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
