from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.schemas.project import (
    ProjectRead, ProjectCount
)
from app.services.project import (
    get_projects,
    count_projects
)
from app.core.database import get_db

router = APIRouter(
    prefix="/public/projects",
    tags=["Projects Public"]
)

@router.get("", response_model=List[ProjectRead])
def list_projects(db: Session = Depends(get_db)):
    return get_projects(db)

@router.get("/stats/count", response_model=ProjectCount)
def projects_count(db: Session = Depends(get_db)):
    total = count_projects(db)
    return {"total_projects": total}