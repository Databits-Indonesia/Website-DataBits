from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas.publication import (
    PublicationCreate, 
    PublicationUpdate, 
    PublicationRead,
    PublicationCount
)
from app.schemas.target_lang import Language
from app.schemas.delete_msg import DeleteMSG
from app.services.publication import (
    create_publication,
    get_publications,
    update_publication,
    delete_publication,
    count_publications
)
from app.services.translate import translate
from app.core.database import get_db
from app.core.dependencies import admin_or_owner, get_current_user

router = APIRouter(
    prefix="/publication",
    tags=["Publication"]
)

@router.post("", response_model=PublicationRead, dependencies=[Depends(admin_or_owner)])
def create(data: PublicationCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    return create_publication(db, data, user_id)

@router.get("", response_model=List[PublicationRead], dependencies=[Depends(admin_or_owner)])
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

@router.get("/stats/count", response_model=PublicationCount, dependencies=[Depends(admin_or_owner)])
def publications_count(db: Session = Depends(get_db)):
    total = count_publications(db)
    return {"total_publications": total}

@router.put("/{publication_id}", response_model=PublicationRead, dependencies=[Depends(admin_or_owner)])
def update(publication_id: int, data: PublicationUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id= int(current_user["sub"])
    return update_publication(db, publication_id, data, user_id)

@router.delete("/{publication_id}", response_model=DeleteMSG, dependencies=[Depends(admin_or_owner)])
def delete(publication_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_publication(db, publication_id, user_id)
    return {"message": "Publication deleted"}