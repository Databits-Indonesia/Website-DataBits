from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas.career import (
    CareerRead, CareerCount
)
from app.schemas.target_lang import Language
from app.services.career import (
    get_careers,
    count_careers
)
from app.services.translate import translate
from app.core.database import get_db

router = APIRouter(
    prefix="/public/career",
    tags=["Career Public"]
)

@router.get("", response_model=List[CareerRead])
async def list_career(target_lang: Language = Query("id"), db: Session = Depends(get_db)):
    careers = get_careers(db)
    FIELDS = [
        "title",
        "content",
    ]
    if not careers:
        return []
    
    for obj in careers:
        data = [getattr(obj, f) for f in FIELDS]
        translated = await translate(data, target_lang)
        
        for f, value in zip(FIELDS, translated):
            setattr(obj, f, value)
    return careers

@router.get("/stats/count", response_model=CareerCount)
def careers_count(db: Session = Depends(get_db)):
    total = count_careers(db)
    return {"total_careers": total}