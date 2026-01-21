from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.schemas.research import (
    ResearchRead, ResearchCount
)
from app.services.research import (
    get_researchs,
    count_researchs
)
from app.core.database import get_db
from app.core.dependencies import (
    admin_or_owner, 
)

router = APIRouter(
    prefix="/public/research",
    tags=["Research Public"]
)

@router.get("", response_model=List[ResearchRead], dependencies=[Depends(admin_or_owner)])
def list_researchs(db: Session = Depends(get_db)):
    return get_researchs(db)

@router.get("/stats/count", response_model=ResearchCount, dependencies=[Depends(admin_or_owner)])
def researchs_count(db: Session = Depends(get_db)):
    total = count_researchs(db)
    return {"total_researchs": total}