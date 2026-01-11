# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# # New imports for serving static files and HTML
# # from fastapi.staticfiles import StaticFiles
# from fastapi.responses import HTMLResponse
# from pydantic import BaseModel
# from typing import Optional
# import os
# import requests
# import google.genai as genai
# import re
# from dotenv import load_dotenv


# # === CONFIG & SECURITY ===

# # 1. Load variables from .env file into the environment
# load_dotenv()


# # IMPORTANT: The API key must be set as an environment variable (e.g., GEMINI_API_KEY)
# # on your deployment platform (Render, Heroku, etc.). It is NOT hardcoded here for security.
# GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

# if not GEMINI_API_KEY:
#     # If the key is not set, raise an error to prevent deployment issues.
#     print("FATAL: GEMINI_API_KEY environment variable not set. Please set it securely.")
    
# # Setup Gemini API client
# MODEL_NAME = "gemini-2.0-flash-001" # Define model name as constant

# try:
#     # FIX 1: Use genai.Client() to initialize the API and load the key securely.
#     # The key is read automatically from the GEMINI_API_KEY environment variable.
#     client = genai.Client()
#     print("Gemini API Client initialized successfully.")
# except Exception as e:
#     # If the key is invalid or client fails, this prints the error.
#     print(f"FATAL: Gemini Client failed to initialize. Check your API key. Error: {e}")
#     # Set client to None if initialization fails.
#     client = None
    
# # FastAPI app
# app = FastAPI()

# # Mount the static files (e.g., the logo image)
# # The static folder is mapped to the '/static' URL path
# # app.mount("/static", StaticFiles(directory="static"), name="static")

# # Enable CORS for deployment (allows any origin to access the API)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Request model for the incoming JSON payload
# class Query(BaseModel):
#     message: str

# @app.get("/", response_class=HTMLResponse)
# async def serve_frontend():
#     with open("Welly_ui.html", "r") as f:
#         html_content = f.read()
#     return HTMLResponse(content=html_content)


# # Chatbot POST endpoint
# # @app.post("/ask")
# # async def ask_student_support(query: Query):
# #     # FIX 2: Check if the API key is missing OR if the client failed to initialize
# #     if not GEMINI_API_KEY or not client:
# #         return {"error": "Chatbot service is unavailable. API Client initialization failed."}, 503
        
# #     try:
# #         user_input = query.message

# #         # System prompt to enforce focus on education + mental health encouragement
# #         system_prompt = (
# #             "You are a student support assistant focused on mental health and academic encouragement. "
# #             "You must respond ONLY with advice, motivation, or tips related to studying, productivity, stress management, "
# #             "wellbeing, and mental health. "
# #             "Do NOT provide irrelevant answers, jokes, or unrelated information. "
# #             "Use a positive, encouraging, and empathetic tone. "
# #             "Explain in 2–3 sentences. "
# #             "Keep it short and concise. "
# #             "Summarize only the key points."
# #         )

# #         # Create a fresh chat instance per request to maintain a stateless API
# #         # FIX 3: Use client.chats.create() to start the chat session.
# #         chat = client.chats.create(
# #             model=MODEL_NAME, 
# #             history=[]
# #         )

# #         # Construct the final prompt for the model
# #         final_prompt = system_prompt + "\nUser: " + user_input
# #         response = chat.send_message(final_prompt)

# #         return {"response": response.text}

# #     except Exception as e:
# #         print(f"Error in /ask endpoint: {e}")
# #         return {"error": "Internal server error during LLM processing."}, 500

# @app.post("/ask")
# async def ask_student_support(query: Query):
#     if not client:
#         return {"error": "Chatbot service unavailable"}, 503

#     system_prompt = (
#         "You are a student support assistant focused on mental health and academic encouragement. "
#         "Respond ONLY with advice, motivation, or tips related to studying, productivity, stress management, "
#         "wellbeing, and mental health. Keep it short (2–3 sentences)."
#     )

#     try:
#         response = client.models.generate_content(
#         model="gemini-2.0-flash-001",
#         contents=f"{system_prompt}\nUser: {query.message}"
#         )
#         return {"response": response.text}

#     except Exception as e:
#         print("Gemini error:", e)
#         return {"error": "Internal server error"}, 500


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    message: str

# --- CONFIGURATION FOR THE STABLE LIBRARY ---
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("CRITICAL ERROR: GEMINI_API_KEY is missing!")
else:
    genai.configure(api_key=api_key)

# We use the standard model name here
MODEL_NAME = "gemini-1.5-flash-001"
model = genai.GenerativeModel(MODEL_NAME)
# -------------------------------------------

@app.post("/ask")
async def ask_student_support(query: Query):
    try:
        # Prompt engineering
        prompt = (
            "You are a student support assistant focused on mental health and academic encouragement. "
            "Respond ONLY with advice, motivation, or tips related to studying, productivity, stress management, "
            "wellbeing, and mental health. Keep it short (2–3 sentences).\n\n"
            f"User: {query.message}"
        )

        # The stable library uses 'generate_content_async', NOT 'client.models.generate_content'
        response = await model.generate_content_async(prompt)

        return {"reply": response.text}

    except Exception as e:
        print("Gemini error:", repr(e))
        return {"error": "Internal server error"}, 500
