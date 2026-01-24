from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.schemas.message import (
    MessageRead, 
    MessageCount
)
from app.schemas.target_lang import Language
from app.schemas.delete_msg import DeleteMSG
from app.services.message import (
    get_messages,
    delete_message,
    count_messages
)
from app.services.translate import translate
from app.core.database import get_db
from app.core.dependencies import admin_or_owner, get_current_user

router = APIRouter(
    prefix="/messages",
    tags=["Messages"]
)

@router.get("", response_model=List[MessageRead], dependencies=[Depends(admin_or_owner)])
async def list_messages(target_lang: Language = Query("id"), db: Session = Depends(get_db)):
    messages = get_messages(db)
    FIELDS = [
        "subject",
        "message_content"
    ]
    if not messages:
        return []
    
    for obj in messages:
        data = [getattr(obj, f) for f in FIELDS]
        translated = await translate(data, target_lang)
        
        for f, value in zip(FIELDS, translated):
            setattr(obj, f, value)
    return messages

@router.get("/count", response_model=MessageCount, dependencies=[Depends(admin_or_owner)])
def messages_count(db: Session = Depends(get_db)):
    total = count_messages(db)
    return {"total_messages": total}

@router.delete("/{message_id}", response_model=DeleteMSG, dependencies=[Depends(admin_or_owner)])
def delete(message_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_message(db, message_id, user_id)
    return {"message": "message deleted"}