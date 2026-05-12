from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.contact import (
    ContactRead, 
)
from app.services.contact import (
    get_contact,
)
from app.core.database import get_db

router = APIRouter(
    prefix="/public/contact",
    tags=["Contact Public"]
)

@router.get("", response_model=List[ContactRead])
def read_contact(db: Session = Depends(get_db)):
    return get_contact(db)