from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from database import Base


class QuotationInfo(Base):
    __tablename__ = "QuotationInfo"
    qID = Column(String, primary_key=True, index=True, nullable=False)
    qTitle = Column(String, nullable=False)
    qDate = Column(DateTime, default=datetime.astimezone, nullable=False)
    qImgLink = Column(String, nullable=False)
    qFileLink = Column(String, nullable=False)


class User(Base):
    __tablename__ = "users"

    email = Column(String, index=False, nullable=False)
    full_name = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    access_token = Column(String, unique=True,
                          primary_key=True, index=True, nullable=False)
