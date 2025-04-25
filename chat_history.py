from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
import os

app = FastAPI()

# MongoDB connection
client = MongoClient(os.getenv("MONGODB_URI"))
db = client.chat_history_db
chat_collection = db.chat_history

@app.post("/chat-history/")
async def save_chat_history(chat_data: dict):
    try:
        chat_collection.insert_one(chat_data)
        return {"message": "Chat history saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/chat-history/")
async def get_chat_history():
    try:
        chats = list(chat_collection.find({}, {"_id": 0}))
        return {"chats": chats}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))