from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.schemas.message import (
    MessageRead, 
    MessageCount
)
from app.schemas.delete_msg import DeleteMSG
from app.services.message import (
    get_messages,
    delete_message,
    count_messages
)
from app.core.database import get_db
from app.core.dependencies import admin_or_owner, get_current_user

router = APIRouter(
    prefix="/messages",
    tags=["Messages"]
)

@router.get("", response_model=List[MessageRead], dependencies=[Depends(admin_or_owner)])
def list_messages(db: Session = Depends(get_db)):
    return get_messages(db)

@router.get("/count", response_model=MessageCount, dependencies=[Depends(admin_or_owner)])
def messages_count(db: Session = Depends(get_db)):
    total = count_messages(db)
    return {"total_messages": total}

@router.delete("/{message_id}", response_model=DeleteMSG, dependencies=[Depends(admin_or_owner)])
def delete(message_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_message(db, message_id, user_id)
    return {"message": "message deleted"}