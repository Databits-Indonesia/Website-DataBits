from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.schemas.project import (
    ProjectCreate, ProjectCreate2, 
    ProjectRead, ProjectUpdate, 
    ProjectUpdate2, ProjectCount
)
from app.schemas.delete_msg import DeleteMSG
from app.schemas.target_lang import Language
from app.services.project import (
    create_project,
    get_projects,
    update_project,
    delete_project,
    upload_cover,
    count_projects
)
from app.services.translate import translate
from app.core.database import get_db
from app.core.dependencies import (
    admin_or_owner, 
    validate_image_file,
    validate_image_file_optional,
    get_current_user
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

@router.post("", response_model=ProjectRead, dependencies=[Depends(admin_or_owner)])
def create(data: ProjectCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    image = validate_image_file(data.image)
    cover_url = upload_cover(image)
    data = ProjectCreate2(title=data.title, desc=data.desc, cover_url=cover_url, category_id=data.category_id)
    return create_project(db, data, user_id)

@router.get("", response_model=List[ProjectRead], dependencies=[Depends(admin_or_owner)])
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

@router.get("/stats/count", response_model=ProjectCount, dependencies=[Depends(admin_or_owner)])
def projects_count(db: Session = Depends(get_db)):
    total = count_projects(db)
    return {"total_projects": total}

@router.put("/{project_id}", response_model=ProjectRead, dependencies=[Depends(admin_or_owner)])
def update(project_id: int, data: ProjectUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    image = validate_image_file_optional(data.image)
    cover_url = upload_cover(image) if image else None
    data = ProjectUpdate2(title=data.title, desc=data.desc, cover_url=cover_url, category_id=data.category_id)
    return update_project(db, project_id, data, user_id)

@router.delete("/{project_id}", response_model=DeleteMSG, dependencies=[Depends(admin_or_owner)])
def delete(project_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_project(db, project_id, user_id)
    return {"message": "Project deleted"}