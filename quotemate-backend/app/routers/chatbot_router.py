import os
from fastapi import APIRouter, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, SystemMessage # Import necessary message types


router = APIRouter()

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize LLM outside of functions
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", api_key=GEMINI_API_KEY)

# Define request model
class MessageRequest(BaseModel):
    message: str
    system_prompt: str = None  # Add system_prompt to the request

@router.post("/process-message/")
def process_message(request: MessageRequest):
    try:
        messages = []
        
        system_prompt = """Reply Backwards Only"""
        messages.append(SystemMessage(content=system_prompt))

        messages.append(HumanMessage(content=request.message))
        
        ai_msg = llm.invoke(messages)

        return {"response": ai_msg.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/prompt-ai/")
def prompt_ai(
    message: str = Query(..., description="The message to prompt the AI with."),
    system_prompt: str = Query(None, description="Custom system prompt to guide AI's response.")
):
    try:
        messages = []
        
        if system_prompt:
            messages.append(SystemMessage(content=system_prompt))
        messages.append(HumanMessage(content=message))
        
        ai_msg = llm.invoke(messages)
        return {"response": ai_msg.content}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
async def root():
    return {"message": "Welcome to the AI Chatbot API"}
