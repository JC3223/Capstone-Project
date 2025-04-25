from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from datetime import datetime
from database import get_db
import models
import database

router = APIRouter()

class QuotationSchema(BaseModel):
    qID: str
    qTitle: str
    qDate: datetime  
    qImgLink: str
    qFileLink: str

    class Config:
        orm_mode = True


@router.get("/", response_model=List[QuotationSchema])
def get_quotations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(database.get_db)
):
    quotations = db.query(models.QuotationInfo).offset(skip).limit(limit).all()
    # Format the date before returning the data
    for quotation in quotations:
        quotation.qDate = quotation.qDate.strftime("%Y-%m-%d")
    return quotations


@router.delete("/{qID}", response_model=QuotationSchema)
def delete_quotation(qID: str, db: Session = Depends(database.get_db)):
    quotation = db.query(models.QuotationInfo).filter(
        models.QuotationInfo.qID == qID).first()
    if quotation is None:
        raise HTTPException(status_code=404, detail="Quotation not found")
    db.delete(quotation)
    db.commit()
    return quotation



