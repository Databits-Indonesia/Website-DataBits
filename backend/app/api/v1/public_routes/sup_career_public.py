from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas.sup_career import (
    SupCareerRead,
)
from app.schemas.target_lang import Language
from app.services.sup_career import (
    get_sup_careers,
)
from app.services.translate import translate
from app.core.database import get_db

router = APIRouter(
    prefix="/public/superiority_career",
    tags=["Superiority Career Public"]
)

@router.get("", response_model=List[SupCareerRead])
async def list_superiority(target_lang: Language = Query("id"), db: Session = Depends(get_db)):
    superiority = get_sup_careers(db)
    FIELDS = [
        "superiority",
        "desc"
    ]
    if not superiority:
        return []
    
    for obj in superiority:
        data = [getattr(obj, f) for f in FIELDS]
        translated = await translate(data, target_lang)
        
        for f, value in zip(FIELDS, translated):
            setattr(obj, f, value)
    return superiority