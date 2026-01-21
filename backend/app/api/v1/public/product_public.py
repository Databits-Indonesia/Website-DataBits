from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.product import (
    ProductRead,
)
from app.services.product import (
    get_products,
)
from app.core.database import get_db

router = APIRouter(
    prefix="/public/product",
    tags=["Product Public"]
)

@router.get("", response_model=List[ProductRead])
def list_products(db: Session = Depends(get_db)):
    return get_products(db)