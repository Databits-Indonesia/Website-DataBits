from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas.career import (
    CareerCreate, 
    CareerUpdate, 
    CareerRead, 
    CareerCount
)
from app.schemas.delete_msg import DeleteMSG
from app.schemas.target_lang import Language
from app.services.career import (
    create_career,
    get_careers,
    update_career,
    delete_career,
    count_careers
)
from app.services.translate import translate
from app.core.database import get_db
from app.core.dependencies import admin_or_owner, get_current_user

router = APIRouter(
    prefix="/career",
    tags=["Career"]
)

@router.post("", response_model=CareerRead, dependencies=[Depends(admin_or_owner)])
def create(data: CareerCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    return create_career(db, data, user_id)

@router.get("", response_model=List[CareerRead], dependencies=[Depends(admin_or_owner)])
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

@router.get("/stats/count", response_model=CareerCount, dependencies=[Depends(admin_or_owner)])
def careers_count(db: Session = Depends(get_db)):
    total = count_careers(db)
    return {"total_careers": total}

@router.put("/{career_id}", response_model=CareerRead, dependencies=[Depends(admin_or_owner)])
def update(career_id: int, data: CareerUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id= int(current_user["sub"])
    return update_career(db, career_id, data, user_id)

@router.delete("/{career_id}", response_model=DeleteMSG, dependencies=[Depends(admin_or_owner)])
def delete(career_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_career(db, career_id, user_id)
    return {"message": "Career deleted"}