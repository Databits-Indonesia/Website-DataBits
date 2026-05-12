from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas.home import (
    HomeRead, 
)
from app.schemas.target_lang import Language
from app.services.home import (
    get_home,
)
from app.services.translate import translate
from app.core.database import get_db

router = APIRouter(
    prefix="/public/home_page",
    tags=["Home Page Public"]
)

@router.get("", response_model=List[HomeRead])
async def read_home_page(target_lang: Language = Query("id"), db: Session = Depends(get_db)):
    home = get_home(db)
    FIELDS = [
        "title",
        "desc",
    ]
    if not home:
        return []
    
    for obj in home:
        data = [getattr(obj, f) for f in FIELDS]
        translated = await translate(data, target_lang)
        
        for f, value in zip(FIELDS, translated):
            setattr(obj, f, value)
    return home