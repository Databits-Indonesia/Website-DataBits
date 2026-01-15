from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.schemas.category import (
    CategoryCreate, 
    CategoryRead, 
    CategoryUpdate, 
    CategoryType
)
from app.services.category import (
    create_category,
    get_categories,
    get_categories_by_type,
    update_category,
    delete_category
)
from app.core.database import get_db
from app.core.dependencies import admin_or_owner, get_current_user

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.post("", response_model=CategoryRead, dependencies=[Depends(admin_or_owner)])
def create(data: CategoryCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    return create_category(db, data, user_id)


@router.get("", response_model=List[CategoryRead], dependencies=[Depends(admin_or_owner)])
def list_categories(db: Session = Depends(get_db)):
    return get_categories(db)


@router.get("/{type}", response_model=List[CategoryRead], dependencies=[Depends(admin_or_owner)])
def list_categories_per_type(type: CategoryType, db: Session = Depends(get_db)):
    return get_categories_by_type(db, type)

@router.put("/{category_id}", response_model=CategoryRead, dependencies=[Depends(admin_or_owner)])
def update(category_id: int, data: CategoryUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    return update_category(db, category_id, data, user_id)


@router.delete("/{category_id}", dependencies=[Depends(admin_or_owner)])
def delete(category_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_category(db, category_id, user_id)
    return {"message": "Category deleted"}