from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.home import Home
from app.schemas.home import HomeCreate, HomeUpdate
from app.services.activity import log_activity

def create_home(db: Session, data: HomeCreate, user_id: int):
    home = Home(
        title=data.title,
        desc=data.desc,
    )

    db.add(home)
    db.commit()
    db.refresh(home)

    log_activity(
        db=db,
        user_id=user_id,
        module="home",
        action="create",
        object_id=home.id,
        description=f"Data Home Page dibuat: {home.title}"
    )
    return home


def get_home(db: Session):
    return db.query(Home).all()


def get_home_by_id(db: Session, home_id: int):
    return db.query(Home).filter(Home.id == home_id).first()


def update_home(db: Session, home_id: int, data: HomeUpdate, user_id: int):
    home = get_home_by_id(db, home_id)

    if not home:
        raise HTTPException(status_code=404, detail="Home Page not found")

    if data.title:
        home.title = data.title

    if data.desc:
        home.desc = data.desc


    db.commit()
    db.refresh(home)

    log_activity(
        db=db,
        user_id=user_id,
        module="home",
        action="update",
        object_id=home.id,
        description=f"Edit data home page: {home.title}"
    )
    return home