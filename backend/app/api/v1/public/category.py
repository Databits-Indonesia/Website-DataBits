from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.schemas.category import CategoryRead, CategoryType
from app.services.category import get_categories, get_categories_by_type
from app.core.database import get_db

router = APIRouter(
    prefix="/public/categories",
    tags=["Categories Public"]
)

@router.get("", response_model=List[CategoryRead])
def list_categories(db: Session = Depends(get_db)):
    return get_categories(db)

@router.get("/{type}", response_model=List[CategoryRead])
def list_categories_per_type(type: CategoryType, db: Session = Depends(get_db)):
    return get_categories_by_type(db, type)