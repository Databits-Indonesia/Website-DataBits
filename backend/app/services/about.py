from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.about import About
from app.schemas.about import AboutCreate, AboutUpdate
from app.services.activity import log_activity

def create_about(db: Session, data: AboutCreate, user_act: int):
    about = About(
        title=data.title,
        desc=data.desc,
        our_philosophy=data.our_philosophy,
        our_mission=data.our_mission,
        our_vision=data.our_vision,
        our_values=data.our_values,
        foundation=data.foundation,
        first_product_launch=data.first_product_launch,
        series_a_funding=data.series_a_funding,
        global_expansion=data.global_expansion
    )

    db.add(about)
    db.commit()
    db.refresh(about)

    log_activity(
        db=db,
        user_id=user_act,
        module="about",
        action="create",
        object_id=about.id,
        description=f"Data About dibuat: {about.title}"
    )
    return about


def get_about(db: Session):
    return db.query(About).all()


def get_about_by_id(db: Session, about_id: int):
    return db.query(About).filter(About.id == about_id).first()


def update_about(db: Session, about_id: int, data: AboutUpdate, user_act: int):
    about = get_about_by_id(db, about_id)

    if not about:
        raise HTTPException(status_code=404, detail="About not found")

    if data.title:
        about.title = data.title

    if data.desc:
        about.desc = data.desc

    if data.our_philosophy:
        about.our_philosophy = data.our_philosophy

    if data.our_mission:
        about.our_mission = data.our_mission

    if data.our_vision:
        about.our_vision = data.our_vision

    if data.our_values:
        about.our_values = data.our_values

    if data.foundation:
        about.foundation = data.foundation

    if data.first_product_launch:
        about.first_product_launch = data.first_product_launch

    if data.series_a_funding:
        about.series_a_funding = data.series_a_funding

    if data.global_expansion:
        about.global_expansion = data.global_expansion

    db.commit()
    db.refresh(about)

    log_activity(
        db=db,
        user_id=user_act,
        module="user",
        action="update",
        object_id=about.id,
        description=f"Edit data about: {about.title}"
    )
    return about