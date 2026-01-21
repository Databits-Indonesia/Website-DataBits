from sqlalchemy.orm import Session
from app.models.research import Research
from app.schemas.research import (
    ResearchCreate,
    ResearchUpdate, 
    ResearchRead
)
from sqlalchemy.orm import joinedload
from fastapi import HTTPException
from app.services.activity import log_activity

def create_research(db: Session, data: ResearchCreate, user_id: int):
    research = Research(
        title=data.title,
        desc=data.desc,
        link=data.link,
        category_id=data.category_id,
    )
    db.add(research)
    db.commit()
    db.refresh(research)
    log_activity(
        db=db,
        user_id=user_id,
        module="research",
        action="create",
        object_id=research.id,
        description=f"Research baru ditambahkan: {research.title}"
    )
    return ResearchRead(
            id=research.id,
            title=research.title,
            desc=research.desc,
            link=research.link,
            category=research.category.name
        )

def get_researchs(db: Session):
    researchs = (
            db.query(Research)
            .options(
                joinedload(Research.category)
            )
            .order_by(Research.created_at.desc())
            .all()
        )

    return [
        ResearchRead(
            id=research.id,
            title=research.title,
            desc=research.desc,
            link=research.link,
            category=research.category.name
        )
        for research in researchs
    ]


def get_research_by_id(db: Session, research_id: int):
    return db.query(Research).filter(Research.id == research_id).first()

def update_research(db: Session, research_id: int, data: ResearchUpdate, user_id: int):
    research = get_research_by_id(db, research_id)

    if not research:
        raise HTTPException(status_code=404, detail="Research not found")
    
    if data.title:
        research.title = data.title

    if data.desc:
        research.desc = data.desc

    if data.link:
        research.link = data.link

    if data.category_id:
        research.category_id = data.category_id

    db.commit()
    db.refresh(research)

    log_activity(
        db=db,
        user_id=user_id,
        module="research",
        action="update",
        object_id=research.id,
        description=f"Edit research: {research.title}"
    )
    return ResearchRead(
            id=research.id,
            title=research.title,
            desc=research.desc,
            link=research.link,
            category=research.category.name
        )

def delete_research(db: Session, research_id: int, user_id: int):
    research = get_research_by_id(db, research_id)
    if not research:
        raise HTTPException(status_code=404, detail="Research not found")
    db.delete(research)
    db.commit()

    log_activity(
        db=db,
        user_id=user_id,
        module="research",
        action="delete",
        object_id=research.id,
        description=f"Hapus research: {research.title}"
    )

def count_researchs(db: Session):
    return db.query(Research).count()