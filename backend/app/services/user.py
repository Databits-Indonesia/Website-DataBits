from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import hash_password
from app.services.activity import log_activity

def create_user(db: Session, data: UserCreate, user_act: int):
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )

    user = User(
        email=data.email,
        username=data.username,
        password=hash_password(data.password),
        role=data.role
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    log_activity(
        db=db,
        user_id=user_act,
        module="user",
        action="create",
        object_id=user.id,
        description=f"User baru ditambahkan: {user.username}"
    )
    return user


def get_users(db: Session):
    return db.query(User).all()


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def update_user(db: Session, user_id: int, data: UserUpdate, user_act: int):
    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if data.email:
        user.email = data.email

    if data.username:
        user.username = data.username

    if data.role:
        user.role = data.role

    if data.password:
        user.password = hash_password(data.password)

    db.commit()
    db.refresh(user)

    log_activity(
        db=db,
        user_id=user_act,
        module="user",
        action="update",
        object_id=user.id,
        description=f"Edit user: {user.username}"
    )
    return user


def delete_user(db: Session, user_id: int, user_act: int):
    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()

    log_activity(
        db=db,
        user_id=user_act,
        module="user",
        action="delete",
        object_id=user.id,
        description=f"Hapus user: {user.username}"
    )

def count_users(db: Session):
    return db.query(User).count()