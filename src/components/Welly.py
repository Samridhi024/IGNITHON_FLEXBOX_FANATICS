from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
import requests
import google.generativeai as genai
import re

# === CONFIG ===
os.environ["GEMINI_API_KEY"] = "AIzaSyDIPTI57LA4vRusE5RmrGc7ryP_-1zFI9U"  # Replace with your Gemini key
OPENWEATHER_API_KEY = "02ea3b1ca1f643f03f1211768875f716"  # Replace with your OpenWeatherMap key

# Setup Gemini API client
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("models/gemini-2.0-flash-001")

# FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class Query(BaseModel):
    message: str



# Chatbot POST endpoint
@app.post("/ask")
async def ask_student_support(query: Query):
    try:
        user_input = query.message

        # System prompt to enforce focus on education + mental health encouragement
        system_prompt = (
            "You are a student support assistant focused on mental health and academic encouragement. "
            "You must respond ONLY with advice, motivation, or tips related to studying, productivity, stress management, "
            "wellbeing, and mental health. "
            "Do NOT provide irrelevant answers, jokes, or unrelated information. "
            "Use a positive, encouraging, and empathetic tone. "
        )

        # Create a fresh chat instance per request to avoid shared state issues
        chat = model.start_chat(history=[])

        # Construct the final prompt for the model
        final_prompt = system_prompt + "\nUser: " + user_input
        response = chat.send_message(final_prompt)

        return {"response": response.text}

    except Exception as e:
        print(f"Error in /ask endpoint: {e}")
        return {"error": "Internal server error"}, 500

