from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas.about import (
    AboutRead, 
)
from app.schemas.target_lang import Language
from app.services.about import (
    get_about,
)
from app.services.translate import translate
from app.core.database import get_db

router = APIRouter(
    prefix="/public/about",
    tags=["About Public"]
)

@router.get("", response_model=List[AboutRead])
async def read_about(target_lang: Language = Query("id"), db: Session = Depends(get_db)):
    FIELDS = [
        "title",
        "desc",
        "our_philosophy",
        "our_mission",
        "our_vision",
        "our_values",
    ]
    about = get_about(db)
    if not about:
        return [] 
    obj = about[0]
    data = [getattr(obj, f) for f in FIELDS]
    translated = await translate(data, target_lang)
    for f, value in zip(FIELDS, translated):
        setattr(obj, f, value)
    return about