from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.contact import (
    ContactCreate, 
    ContactUpdate, 
    ContactRead, 
)
from app.services.contact import (
    create_contact,
    get_contact,
    update_contact,
)
from app.core.database import get_db
from app.core.dependencies import admin_or_owner, get_current_user, validate_phone

router = APIRouter(
    prefix="/contact",
    tags=["Contact"]
)

@router.post("", response_model=ContactRead, dependencies=[Depends(admin_or_owner)])
def create(data: ContactCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    data.telephone = validate_phone(data.telephone)
    return create_contact(db, data, user_id)

@router.get("", response_model=List[ContactRead], dependencies=[Depends(admin_or_owner)])
def read_contact(db: Session = Depends(get_db)):
    return get_contact(db)

@router.put("/{contact_id}", response_model=ContactRead, dependencies=[Depends(admin_or_owner)])
def update(contact_id: int, data: ContactUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id= int(current_user["sub"])
    return update_contact(db, contact_id, data, user_id)