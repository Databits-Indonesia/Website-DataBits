from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project import (
    ProjectCreate2,
    ProjectUpdate2, 
    ProjectRead
)
from sqlalchemy.orm import joinedload
from fastapi import HTTPException, UploadFile
from app.services.activity import log_activity
import uuid, os

UPLOAD_DIR = "app/uploads/project"

def create_project(db: Session, data: ProjectCreate2, user_id: int):
    project = Project(
        title=data.title,
        desc=data.desc,
        cover_url=data.cover_url,
        link=data.link,
        category_id=data.category_id,
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    log_activity(
        db=db,
        user_id=user_id,
        module="project",
        action="create",
        object_id=project.id,
        description=f"Project baru ditambahkan: {project.title}"
    )
    return ProjectRead(
            id=project.id,
            title=project.title,
            desc=project.desc,
            cover_url=project.cover_url,
            link=project.link,
            category=project.category.name
        )

def get_projects(db: Session):
    projects = (
            db.query(Project)
            .options(
                joinedload(Project.category)
            )
            .order_by(Project.created_at.desc())
            .all()
        )

    return [
        ProjectRead(
            id=project.id,
            title=project.title,
            desc=project.desc,
            cover_url=project.cover_url,
            link=project.link,
            category=project.category.name
        )
        for project in projects
    ]


def get_project_by_id(db: Session, project_id: int):
    return db.query(Project).filter(Project.id == project_id).first()

def update_project(db: Session, project_id: int, data: ProjectUpdate2, user_id: int):
    project = get_project_by_id(db, project_id)

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if data.title:
        project.title = data.title

    if data.desc:
        project.desc = data.desc

    if data.cover_url:
        try:
            delete_cover_image(project.cover_url)
        except:
            pass
        project.cover_url = data.cover_url

    if data.link:
        project.link = data.link

    if data.category_id:
        project.category_id = data.category_id

    db.commit()
    db.refresh(project)

    log_activity(
        db=db,
        user_id=user_id,
        module="project",
        action="update",
        object_id=project.id,
        description=f"Edit project: {project.title}"
    )
    return ProjectRead(
            id=project.id,
            title=project.title,
            desc=project.desc,
            cover_url=project.cover_url,
            link=project.link,
            category=project.category.name
        )

def delete_project(db: Session, project_id: int, user_id: int):
    project = get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    cover_url = project.cover_url
    db.delete(project)
    db.commit()
    try:
        delete_cover_image(cover_url)
    except:
        pass

    log_activity(
        db=db,
        user_id=user_id,
        module="project",
        action="delete",
        object_id=project.id,
        description=f"Hapus project: {project.title}"
    )

def upload_cover(image: UploadFile):
    ext = os.path.splitext(image.filename)[1].lower()
    filename = f"{uuid.uuid4()}{ext}"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as buffer:
        buffer.write(image.file.read())
    image_url = f"/static/project/{filename}"
    return image_url

def delete_cover_image(image_url: str):
    if not image_url:
        return

    file_path = image_url.replace("/static/project/", "")
    full_path = os.path.join(UPLOAD_DIR, file_path)

    if os.path.exists(full_path):
        os.remove(full_path)

def count_projects(db: Session):
    return db.query(Project).count()