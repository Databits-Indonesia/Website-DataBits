from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.schemas.research import (
    ResearchCreate, ResearchRead, 
    ResearchUpdate, ResearchCount
)
from app.schemas.delete_msg import DeleteMSG
from app.services.research import (
    create_research,
    get_researchs,
    update_research,
    delete_research,
    count_researchs
)
from app.core.database import get_db
from app.core.dependencies import (
    admin_or_owner, 
    get_current_user
)

router = APIRouter(
    prefix="/research",
    tags=["Research"]
)

@router.post("", response_model=ResearchRead, dependencies=[Depends(admin_or_owner)])
def create(data: ResearchCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    data = ResearchCreate(title=data.title, desc=data.desc, link=data.link, category_id=data.category_id)
    return create_research(db, data, user_id)

@router.get("", response_model=List[ResearchRead], dependencies=[Depends(admin_or_owner)])
def list_researchs(db: Session = Depends(get_db)):
    return get_researchs(db)

@router.get("/stats/count", response_model=ResearchCount, dependencies=[Depends(admin_or_owner)])
def researchs_count(db: Session = Depends(get_db)):
    total = count_researchs(db)
    return {"total_researchs": total}

@router.put("/{research_id}", response_model=ResearchRead, dependencies=[Depends(admin_or_owner)])
def update(research_id: int, data: ResearchUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    data = ResearchUpdate(title=data.title, desc=data.desc, link=data.link, category_id=data.category_id)
    return update_research(db, research_id, data, user_id)

@router.delete("/{research_id}", response_model=DeleteMSG, dependencies=[Depends(admin_or_owner)])
def delete(research_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_research(db, research_id, user_id)
    return {"message": "research deleted"}