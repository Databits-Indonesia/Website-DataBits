from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.product import (
    ProductCreate, 
    ProductUpdate, 
    ProductRead,
    ProductCount
)
from app.schemas.delete_msg import DeleteMSG
from app.services.product import (
    create_product,
    get_products,
    update_product,
    delete_product,
    count_products
)
from app.core.database import get_db
from app.core.dependencies import admin_or_owner, get_current_user

router = APIRouter(
    prefix="/product",
    tags=["Product"]
)

@router.post("", response_model=ProductRead, dependencies=[Depends(admin_or_owner)])
def create(data: ProductCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    return create_product(db, data, user_id)

@router.get("", response_model=List[ProductRead], dependencies=[Depends(admin_or_owner)])
def list_products(db: Session = Depends(get_db)):
    return get_products(db)

@router.get("/stats/count", response_model=ProductCount, dependencies=[Depends(admin_or_owner)])
def products_count(db: Session = Depends(get_db)):
    total = count_products(db)
    return {"total_products": total}

@router.put("/{product_id}", response_model=ProductRead, dependencies=[Depends(admin_or_owner)])
def update(product_id: int, data: ProductUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id= int(current_user["sub"])
    return update_product(db, product_id, data, user_id)

@router.delete("/{product_id}", response_model=DeleteMSG, dependencies=[Depends(admin_or_owner)])
def delete(product_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_product(db, product_id, user_id)
    return {"message": "Product deleted"}