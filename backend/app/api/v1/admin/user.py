from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.user import (
    UserCreate, 
    UserUpdate, 
    UserResponse, 
    UserCount
)
from app.schemas.delete_msg import DeleteMSG
from app.services.user import (
    create_user,
    get_users,
    update_user,
    delete_user,
    count_users
)
from app.core.database import get_db
from app.core.dependencies import owner_only, admin_or_owner, get_current_user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("", response_model=UserResponse, dependencies=[Depends(owner_only)])
def create(data: UserCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_act = int(current_user["sub"])
    return create_user(db, data, user_act)

@router.get("", response_model=List[UserResponse], dependencies=[Depends(owner_only)])
def list_users(db: Session = Depends(get_db)):
    return get_users(db)

@router.get("/stats/count", response_model=UserCount, dependencies=[Depends(admin_or_owner)])
def user_count(db: Session = Depends(get_db)):
    total = count_users(db)
    return {"total_users": total}

@router.put("/{user_id}", response_model=UserResponse, dependencies=[Depends(owner_only)])
def update(user_id: int, data: UserUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_act= int(current_user["sub"])
    return update_user(db, user_id, data, user_act)

@router.delete("/{user_id}", response_model=DeleteMSG, dependencies=[Depends(owner_only)])
def delete(user_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_act = int(current_user["sub"])
    delete_user(db, user_id, user_act)
    return {"message": "User deleted"}