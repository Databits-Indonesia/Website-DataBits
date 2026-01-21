from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.career import (
    CareerRead, 
)
from app.services.career import (
    get_careers,
)
from app.core.database import get_db

router = APIRouter(
    prefix="/public/career",
    tags=["Career Public"]
)

@router.get("", response_model=List[CareerRead])
def list_careers(db: Session = Depends(get_db)):
    return get_careers(db)