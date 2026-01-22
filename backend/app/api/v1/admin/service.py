from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.service import (
    ServiceCreate, 
    ServiceUpdate, 
    ServiceRead,
    ServiceCount
)
from app.services.service import (
    create_service,
    get_services,
    update_service,
    delete_service,
    count_services
)
from app.core.database import get_db
from app.core.dependencies import admin_or_owner, get_current_user

router = APIRouter(
    prefix="/service",
    tags=["Service"]
)

@router.post("", response_model=ServiceRead, dependencies=[Depends(admin_or_owner)])
def create(data: ServiceCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    return create_service(db, data, user_id)

@router.get("", response_model=List[ServiceRead], dependencies=[Depends(admin_or_owner)])
def list_services(db: Session = Depends(get_db)):
    return get_services(db)

@router.get("/stats/count", response_model=ServiceCount, dependencies=[Depends(admin_or_owner)])
def services_count(db: Session = Depends(get_db)):
    total = count_services(db)
    return {"total_services": total}

@router.put("/{service_id}", response_model=ServiceRead, dependencies=[Depends(admin_or_owner)])
def update(service_id: int, data: ServiceUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id= int(current_user["sub"])
    return update_service(db, service_id, data, user_id)

@router.delete("/{service_id}", dependencies=[Depends(admin_or_owner)])
def delete(service_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_service(db, service_id, user_id)
    return {"message": "Service deleted"}