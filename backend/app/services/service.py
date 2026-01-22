from sqlalchemy.orm import Session, selectinload
from fastapi import HTTPException
from app.models.service import Service
from app.models.list_service import ListService
from app.schemas.service import ServiceCreate, ServiceUpdate
from app.services.activity import log_activity

def create_service(db: Session, data: ServiceCreate, user_id: int):
    service = Service(
        name=data.name,
        desc=data.desc,
        icon=data.icon,
    )

    for item in data.list_service:
        service.list_service.append(ListService(service=item.service))

    db.add(service)
    db.commit()
    db.refresh(service)

    log_activity(
        db=db,
        user_id=user_id,
        module="service",
        action="create",
        object_id=service.id,
        description=f"Service baru ditambahkan: {service.name}"
    )
    return service


def get_services(db: Session):
    return (
        db.query(Service)
        .options(selectinload(Service.list_service))
        .all()
    )

def get_service_by_id(db: Session, service_id: int):
    return (
        db.query(Service)
        .options(selectinload(Service.list_service))
        .filter(Service.id == service_id)
        .first()
    )

def update_service(db: Session, service_id: int, data: ServiceUpdate, user_id: int):
    service = get_service_by_id(db, service_id)

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    if data.name:
        service.name = data.name   

    if data.desc:
        service.desc = data.desc

    if data.icon:
        service.icon = data.icon

    if data.list_service is not None:
        service.list_service.clear()
        for item in data.list_service:
            service.list_service.append(ListService(service=item.service))

    db.commit()
    db.refresh(service)

    log_activity(
        db=db,
        user_id=user_id,
        module="service",
        action="update",
        object_id=service.id,
        description=f"Edit data service: {service.name}"
    )
    return service

def delete_service(db: Session, service_id: int, user_id: int):
    service = get_service_by_id(db, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(service)
    db.commit()

    log_activity(
        db=db,
        user_id=user_id,
        module="service",
        action="delete",
        object_id=service.id,
        description=f"Hapus Service: {service.name}"
    )

def count_services(db: Session):
    return db.query(Service).count()