from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.sup_career import SupCareer
from app.schemas.sup_career import SupCareerCreate, SupCareerUpdate
from app.services.activity import log_activity

def create_sup_career(db: Session, data: SupCareerCreate, user_id: int):
    sup_career = SupCareer(
        superiority=data.superiority,
        desc=data.desc,
        icon=data.icon,
    )

    db.add(sup_career)
    db.commit()
    db.refresh(sup_career)

    log_activity(
        db=db,
        user_id=user_id,
        module="sup_career",
        action="create",
        object_id=sup_career.id,
        description=f"Superiority Career baru ditambahkan: {sup_career.superiority}"
    )
    return sup_career


def get_sup_careers(db: Session):
    return db.query(SupCareer).all()


def get_sup_career_by_id(db: Session, sup_career_id: int):
    return db.query(SupCareer).filter(SupCareer.id == sup_career_id).first()


def update_sup_career(db: Session, sup_career_id: int, data: SupCareerUpdate, user_id: int):
    sup_career = get_sup_career_by_id(db, sup_career_id)

    if not sup_career:
        raise HTTPException(status_code=404, detail="Superiority Career not found")

    if data.superiority:
        sup_career.superiority = data.superiority

    if data.desc:
        sup_career.desc = data.desc

    if data.icon:
        sup_career.icon = data.icon

    db.commit()
    db.refresh(sup_career)

    log_activity(
        db=db,
        user_id=user_id,
        module="sup_career",
        action="update",
        object_id=sup_career.id,
        description=f"Edit data superiority career: {sup_career.superiority}"
    )
    return sup_career

def delete_sup_career(db: Session, sup_career_id: int, user_id: int):
    sup_career = get_sup_career_by_id(db, sup_career_id)
    if not sup_career:
        raise HTTPException(status_code=404, detail="Superiority Career not found")
    db.delete(sup_career)
    db.commit()

    log_activity(
        db=db,
        user_id=user_id,
        module="sup_career",
        action="delete",
        object_id=sup_career.id,
        description=f"Hapus superiority career: {sup_career.superiority}"
    )