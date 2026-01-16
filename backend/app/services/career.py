from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.career import Career
from app.schemas.career import CareerCreate, CareerUpdate
from app.services.activity import log_activity

def create_career(db: Session, data: CareerCreate, user_act: int):
    career = Career(
        position=data.position,
        work_mode=data.work_mode,
        job_type=data.job_type,
        desc=data.desc,
        apply_link=data.apply_link,
        category_id=data.category_id,
    )

    db.add(career)
    db.commit()
    db.refresh(career)

    log_activity(
        db=db,
        user_id=user_act,
        module="career",
        action="create",
        object_id=career.id,
        description=f"Career baru ditambahkan: {career.position}"
    )
    return career


def get_careers(db: Session):
    return db.query(Career).all()


def get_career_by_id(db: Session, career_id: int):
    return db.query(Career).filter(Career.id == career_id).first()


def update_career(db: Session, career_id: int, data: CareerUpdate, user_act: int):
    career = get_career_by_id(db, career_id)

    if not career:
        raise HTTPException(status_code=404, detail="Career not found")

    if data.position:
        career.position = data.position

    if data.work_mode:
        career.work_mode = data.work_mode

    if data.job_type:
        career.job_type = data.job_type

    if data.desc:
        career.desc = data.desc

    if data.apply_link:
        career.apply_link = data.apply_link

    if data.category_id:
        career.category_id = data.category_id

    db.commit()
    db.refresh(career)

    log_activity(
        db=db,
        user_id=user_act,
        module="career",
        action="update",
        object_id=career.id,
        description=f"Edit data career: {career.position}"
    )
    return career

def delete_career(db: Session, career_id: int, user_id: int):
    career = get_career_by_id(db, career_id)
    if not career:
        raise HTTPException(status_code=404, detail="Career not found")
    db.delete(career)
    db.commit()

    log_activity(
        db=db,
        user_id=user_id,
        module="career",
        action="delete",
        object_id=career.id,
        description=f"Hapus career: {career.position}"
    )

def count_careers(db: Session):
    return db.query(Career).count()