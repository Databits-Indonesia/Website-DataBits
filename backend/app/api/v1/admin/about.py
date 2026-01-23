from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas.about import (
    AboutCreate, 
    AboutUpdate, 
    AboutRead, 
)
from app.schemas.target_lang import Language
from app.services.about import (
    create_about,
    get_about,
    update_about,
)
from app.services.translate import translate
from app.core.database import get_db
from app.core.dependencies import admin_or_owner, get_current_user

router = APIRouter(
    prefix="/about",
    tags=["About"]
)

@router.post("", response_model=AboutRead, dependencies=[Depends(admin_or_owner)])
def create(data: AboutCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    return create_about(db, data, user_id)

@router.get("", response_model=List[AboutRead], dependencies=[Depends(admin_or_owner)])
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

@router.put("/{about_id}", response_model=AboutRead, dependencies=[Depends(admin_or_owner)])
def update(about_id: int, data: AboutUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id= int(current_user["sub"])
    return update_about(db, about_id, data, user_id)