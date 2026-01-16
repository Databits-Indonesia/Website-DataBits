from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactUpdate
from app.services.activity import log_activity

def create_contact(db: Session, data: ContactCreate, telephone: str, user_id: int):
    contact = Contact(
        email=data.email,
        telephone=telephone,
        headquarters=data.headquarters
    )

    db.add(contact)
    db.commit()
    db.refresh(contact)

    log_activity(
        db=db,
        user_id=user_id,
        module="contact",
        action="create",
        object_id=contact.id,
        description=f"Data Contact dibuat: {contact.email}"
    )
    return contact


def get_contact(db: Session):
    return db.query(Contact).all()


def get_contact_by_id(db: Session, contact_id: int):
    return db.query(Contact).filter(Contact.id == contact_id).first()


def update_contact(db: Session, contact_id: int, data: ContactUpdate, telephone: str, user_id: int):
    contact = get_contact_by_id(db, contact_id)

    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    if data.email:
        contact.email = data.email

    if data.headquarters:
        contact.headquarters = data.headquarters

    if telephone:
        contact.telephone = telephone

    db.commit()
    db.refresh(contact)

    log_activity(
        db=db,
        user_id=user_id,
        module="contact",
        action="update",
        object_id=contact.id,
        description=f"Edit data contact: {contact.email}"
    )
    return contact