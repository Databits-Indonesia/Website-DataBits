from sqlalchemy.orm import Session
from app.models.message import Message
from app.schemas.message import MessageCreate
from app.services.activity import log_activity
from fastapi import HTTPException

def create_message_public(db: Session, data: MessageCreate):
    message = Message(
        name=data.name,
        email=data.email,
        subject=data.subject,
        company=data.company,
        message_content=data.message_content,
    )
    db.add(message)
    db.commit()
    db.refresh(message)

    log_activity(
        db=db,
        user_id=None,
        module="message",
        action="create",
        object_id=message.id,
        description=f"Pesan baru: {message.name}"
    )
    return message

def get_messages(db: Session):
    return db.query(Message).all()

def get_message_by_id(db: Session, message_id: int):
    return db.query(Message).filter(Message.id == message_id).first()

def delete_message(db: Session, message_id: int, user_id: int):
    message = get_message_by_id(db, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(message)
    db.commit()

    log_activity(
        db=db,
        user_id=user_id,
        module="message",
        action="delete",
        object_id=message.id,
        description=f"Hapus pesan: {message.name}"
    )

def count_messages(db: Session):
    return db.query(Message).count()