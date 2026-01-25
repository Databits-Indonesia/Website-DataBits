from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.schemas.service import (
    ServiceCreate, 
    ServiceUpdate, 
    ServiceRead,
    ServiceCount
)
from app.schemas.target_lang import Language
from app.schemas.delete_msg import DeleteMSG
from app.services.service import (
    create_service,
    get_services,
    update_service,
    delete_service,
    count_services
)
from app.services.translate import translate
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
async def list_services(target_lang: Language = Query("id"), db: Session = Depends(get_db)):
    services = get_services(db)
    FIELDS = [
        "title",
        "desc"
    ]
    if not services:
        return []
    
    for obj in services:
        data = [getattr(obj, f) for f in FIELDS]
        translated = await translate(data, target_lang)
        
        for f, value in zip(FIELDS, translated):
            setattr(obj, f, value)
    return services

@router.get("/stats/count", response_model=ServiceCount, dependencies=[Depends(admin_or_owner)])
def services_count(db: Session = Depends(get_db)):
    total = count_services(db)
    return {"total_services": total}

@router.put("/{service_id}", response_model=ServiceRead, dependencies=[Depends(admin_or_owner)])
def update(service_id: int, data: ServiceUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id= int(current_user["sub"])
    return update_service(db, service_id, data, user_id)

@router.delete("/{service_id}", response_model=DeleteMSG, dependencies=[Depends(admin_or_owner)])
def delete(service_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_service(db, service_id, user_id)
    return {"message": "Service deleted"}