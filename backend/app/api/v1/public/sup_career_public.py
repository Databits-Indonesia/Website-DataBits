from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.sup_career import (
    SupCareerRead,
)
from app.services.sup_career import (
    get_sup_careers,
)
from app.core.database import get_db

router = APIRouter(
    prefix="/public/superiority_career",
    tags=["Superiority Career Public"]
)

@router.get("", response_model=List[SupCareerRead])
def list_superiority(db: Session = Depends(get_db)):
    return get_sup_careers(db)