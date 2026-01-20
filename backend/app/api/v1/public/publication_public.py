from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.publication import (
    PublicationRead,
    PublicationCount
)
from app.services.publication import (
    get_publications,
    count_publications
)
from app.core.database import get_db

router = APIRouter(
    prefix="/public/publication",
    tags=["Publication Public"]
)


@router.get("", response_model=List[PublicationRead])
def list_publications(db: Session = Depends(get_db)):
    return get_publications(db)

@router.get("/stats/count", response_model=PublicationCount)
def publications_count(db: Session = Depends(get_db)):
    total = count_publications(db)
    return {"total_publications": total}