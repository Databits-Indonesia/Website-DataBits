from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas.sup_career import (
    SupCareerCreate, 
    SupCareerUpdate, 
    SupCareerRead,
)
from app.schemas.target_lang import Language
from app.schemas.delete_msg import DeleteMSG
from app.services.sup_career import (
    create_sup_career,
    get_sup_careers,
    update_sup_career,
    delete_sup_career,
)
from app.services.translate import translate
from app.core.database import get_db
from app.core.dependencies import admin_or_owner, get_current_user

router = APIRouter(
    prefix="/superiority_career",
    tags=["Superiority Career"]
)

@router.post("", response_model=SupCareerRead, dependencies=[Depends(admin_or_owner)])
def create(data: SupCareerCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    return create_sup_career(db, data, user_id)

@router.get("", response_model=List[SupCareerRead], dependencies=[Depends(admin_or_owner)])
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

@router.put("/{sup_career_id}", response_model=SupCareerRead, dependencies=[Depends(admin_or_owner)])
def update(sup_career_id: int, data: SupCareerUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id= int(current_user["sub"])
    return update_sup_career(db, sup_career_id, data, user_id)

@router.delete("/{sup_career_id}", response_model=DeleteMSG, dependencies=[Depends(admin_or_owner)])
def delete(sup_career_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_sup_career(db, sup_career_id, user_id)
    return {"message": "Superiority deleted"}