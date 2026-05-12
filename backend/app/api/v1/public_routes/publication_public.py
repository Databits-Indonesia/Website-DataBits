from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas.publication import (
    PublicationRead,
    PublicationCount
)
from app.schemas.target_lang import Language
from app.services.publication import (
    get_publications,
    count_publications
)
from app.services.translate import translate
from app.core.database import get_db

router = APIRouter(
    prefix="/public/publication",
    tags=["Publication Public"]
)


@router.get("", response_model=List[PublicationRead])
async def list_publications(target_lang: Language = Query("id"), db: Session = Depends(get_db)):
    publications = get_publications(db)
    FIELDS = [
        "title",
        "journal",
        "desc"
    ]
    if not publications:
        return []
    
    for obj in publications:
        data = [getattr(obj, f) for f in FIELDS]
        translated = await translate(data, target_lang)
        
        for f, value in zip(FIELDS, translated):
            setattr(obj, f, value)
    return publications

@router.get("/stats/count", response_model=PublicationCount)
def publications_count(db: Session = Depends(get_db)):
    total = count_publications(db)
    return {"total_publications": total}