from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.about import (
    AboutRead, 
)
from app.services.about import (
    get_about,
)
from app.core.database import get_db

router = APIRouter(
    prefix="/public/about",
    tags=["About Public"]
)

@router.get("", response_model=List[AboutRead])
def read_about(db: Session = Depends(get_db)):
    return get_about(db)