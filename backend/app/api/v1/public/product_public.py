from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas.product import (
    ProductRead,
)
from app.schemas.target_lang import Language
from app.services.product import (
    get_products,
)
from app.services.translate import translate
from app.core.database import get_db

router = APIRouter(
    prefix="/public/product",
    tags=["Product Public"]
)

@router.get("", response_model=List[ProductRead])
async def list_products(target_lang: Language = Query("id"), db: Session = Depends(get_db)):
    products = get_products(db)
    FIELDS = [
        "name",
        "desc"
    ]
    if not products:
        return []
    
    for obj in products:
        data = [getattr(obj, f) for f in FIELDS]
        translated = await translate(data, target_lang)
        
        for f, value in zip(FIELDS, translated):
            setattr(obj, f, value)
    return products