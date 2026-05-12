from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas.service import (
    ServiceRead,
    ServiceCount
)
from app.schemas.target_lang import Language
from app.services.service import (
    get_services,
    count_services
)
from app.services.translate import translate
from app.core.database import get_db

router = APIRouter(
    prefix="/public/service",
    tags=["Service Public"]
)

@router.get("", response_model=List[ServiceRead])
async def list_services(target_lang: Language = Query("id"), db: Session = Depends(get_db)):
    services = get_services(db)
    FIELDS = [
        "title",
        "desc"
    ]
    if not services:
        return []
    
    for obj in services:
        data = [getattr(obj, f) for f in FIELDS]
        translated = await translate(data, target_lang)
        
        for f, value in zip(FIELDS, translated):
            setattr(obj, f, value)
    return services

@router.get("/stats/count", response_model=ServiceCount)
def services_count(db: Session = Depends(get_db)):
    total = count_services(db)
    return {"total_services": total}