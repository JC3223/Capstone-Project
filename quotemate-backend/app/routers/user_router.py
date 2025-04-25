from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from database import get_db
from models import User
import database

router = APIRouter()


class UserSchema(BaseModel):

    full_name: str
    email: str
    phone_number: str
    access_token: str = None

    class Config:
        orm_mode = True


@router.post("/", response_model=UserSchema)
def create_user(user_data: UserSchema, db: Session = Depends(get_db)):
    user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        phone_number=user_data.phone_number,
        access_token=user_data.access_token,

    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.get("/", response_model=List[UserSchema])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.delete("/{access_token}")
def delete_user(access_token: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.access_token == access_token).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}
