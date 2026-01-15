from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session
from typing import List
from app.schemas.message import (
    MessageCreate, 
    MessageRead, 
)
from app.services.message import (
    create_message_public,
)
from app.core.database import get_db

router = APIRouter(
    prefix="/public/messages",
    tags=["Messages Public"]
)

@router.post("", response_model=MessageRead)
def create(name: str = Form(...),
           email: str = Form(...),
           subject: str = Form(...),
           company: str = Form(...),
           message_content: str = Form(...),
           db: Session = Depends(get_db)):
    data = MessageCreate(name=name, email=email, subject=subject, 
                         company=company, message_content=message_content)
    return create_message_public(db, data)