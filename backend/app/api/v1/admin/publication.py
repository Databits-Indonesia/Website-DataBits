from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.publication import (
    PublicationCreate, 
    PublicationUpdate, 
    PublicationRead,
    PublicationCount
)
from app.services.publication import (
    create_publication,
    get_publications,
    update_publication,
    delete_publication,
    count_publications
)
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
def list_publications(db: Session = Depends(get_db)):
    return get_publications(db)

@router.get("/stats/count", response_model=PublicationCount, dependencies=[Depends(admin_or_owner)])
def publications_count(db: Session = Depends(get_db)):
    total = count_publications(db)
    return {"total_publications": total}

@router.put("/{publication_id}", response_model=PublicationRead, dependencies=[Depends(admin_or_owner)])
def update(publication_id: int, data: PublicationUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id= int(current_user["sub"])
    return update_publication(db, publication_id, data, user_id)

@router.delete("/{publication_id}", dependencies=[Depends(admin_or_owner)])
def delete(publication_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_publication(db, publication_id, user_id)
    return {"message": "Publication deleted"}