from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.schemas.research import (
    ResearchRead, ResearchCount
)
from app.schemas.target_lang import Language
from app.services.research import (
    get_researchs,
    count_researchs
)
from app.services.translate import translate
from app.core.database import get_db
from app.core.dependencies import (
    admin_or_owner, 
)

router = APIRouter(
    prefix="/public/research",
    tags=["Research Public"]
)

@router.get("", response_model=List[ResearchRead], dependencies=[Depends(admin_or_owner)])
async def list_researchs(target_lang: Language = Query("id"), db: Session = Depends(get_db)):
    researchs = get_researchs(db)
    FIELDS = [
        "title",
        "desc"
    ]
    if not researchs:
        return []
    
    for obj in researchs:
        data = [getattr(obj, f) for f in FIELDS]
        translated = await translate(data, target_lang)
        
        for f, value in zip(FIELDS, translated):
            setattr(obj, f, value)
    return researchs

@router.get("/stats/count", response_model=ResearchCount, dependencies=[Depends(admin_or_owner)])
def researchs_count(db: Session = Depends(get_db)):
    total = count_researchs(db)
    return {"total_researchs": total}