from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import quotation_router, user_router, chatbot_router  # Import chatbot_router

app = FastAPI()


header('Access-Control-Allow-Headers: *')
header("Access-Control-Allow-Origin: *")
header("Access-Control-Allow-Methods: *")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)

# Include the routers in the main app
app.include_router(quotation_router.router,
                   prefix="/QuotationInfo", tags=["Quotations"])
app.include_router(user_router.router, prefix="/users", tags=["users"])
app.include_router(chatbot_router.router, prefix="/chatbot", tags=["Chatbot"]) # Include chatbot_router
