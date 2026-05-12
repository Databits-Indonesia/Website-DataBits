from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.schemas.project import (
    ProjectRead, ProjectCount
)
from app.schemas.target_lang import Language
from app.services.project import (
    get_projects,
    count_projects
)
from app.services.translate import translate
from app.core.database import get_db

router = APIRouter(
    prefix="/public/projects",
    tags=["Projects Public"]
)

@router.get("", response_model=List[ProjectRead])
async def list_projects(target_lang: Language = Query("id"), db: Session = Depends(get_db)):
    projects = get_projects(db)
    FIELDS = [
        "title",
        "desc"
    ]
    if not projects:
        return []
    
    for obj in projects:
        data = [getattr(obj, f) for f in FIELDS]
        translated = await translate(data, target_lang)
        
        for f, value in zip(FIELDS, translated):
            setattr(obj, f, value)
    return projects

@router.get("/stats/count", response_model=ProjectCount)
def projects_count(db: Session = Depends(get_db)):
    total = count_projects(db)
    return {"total_projects": total}