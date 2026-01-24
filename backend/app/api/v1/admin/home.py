from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas.home import (
    HomeCreate, 
    HomeUpdate, 
    HomeRead, 
)
from app.schemas.target_lang import Language
from app.services.home import (
    create_home,
    get_home,
    update_home,
)
from app.services.translate import translate
from app.core.database import get_db
from app.core.dependencies import admin_or_owner, get_current_user

router = APIRouter(
    prefix="/home_page",
    tags=["Home Page"]
)

@router.post("", response_model=HomeRead, dependencies=[Depends(admin_or_owner)])
def create(data: HomeCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    return create_home(db, data, user_id)

@router.get("", response_model=List[HomeRead], dependencies=[Depends(admin_or_owner)])
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

@router.put("/{home_id}", response_model=HomeRead, dependencies=[Depends(admin_or_owner)])
def update(home_id: int, data: HomeUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id= int(current_user["sub"])
    return update_home(db, home_id, data, user_id)