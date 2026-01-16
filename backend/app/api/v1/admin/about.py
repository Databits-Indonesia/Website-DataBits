from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.about import (
    AboutCreate, 
    AboutUpdate, 
    AboutRead, 
)
from app.services.about import (
    create_about,
    get_about,
    update_about,
)
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
def read_about(db: Session = Depends(get_db)):
    return get_about(db)

@router.put("/{about_id}", response_model=AboutRead, dependencies=[Depends(admin_or_owner)])
def update(about_id: int, data: AboutUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id= int(current_user["sub"])
    return update_about(db, about_id, data, user_id)