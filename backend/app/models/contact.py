from sqlalchemy import Column, Integer, String, Date, Text
from sqlalchemy.orm import relationship
from app.core.database import Base

class Contact(Base):
    __tablename__ = "contact"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255, collation="utf8mb4_bin"), unique=True, nullable=False, index=True)
    telephone = Column(String(20), nullable=False)
    headquarters = Column(String(255), nullable=False)