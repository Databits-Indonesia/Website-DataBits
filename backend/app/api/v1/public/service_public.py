from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.service import (
    ServiceRead,
    ServiceCount
)
from app.services.service import (
    get_services,
    count_services
)
from app.core.database import get_db

router = APIRouter(
    prefix="/public/service",
    tags=["Service Public"]
)

@router.get("", response_model=List[ServiceRead])
def list_services(db: Session = Depends(get_db)):
    return get_services(db)

@router.get("/stats/count", response_model=ServiceCount)
def services_count(db: Session = Depends(get_db)):
    total = count_services(db)
    return {"total_services": total}