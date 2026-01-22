from pydantic import BaseModel, Field
from typing import Optional, List
from app.schemas.list_service import (
    ListServiceRead, 
    ListServiceCreate,
    ListServiceUpdate
)

class ServiceBase(BaseModel):
    name: str = Field(
        ...,
        description="Nama Service"
    )
    desc: str = Field(
        ...,
        description="Deskripsi Service"
    )
    icon: str = Field(
        ...,
        description="Icon Service"
    )

class ServiceCreate(ServiceBase):
    list_service: List[ListServiceCreate] = Field(
        ...,
        description="List service yang bisa dilakukan"
    )

class ServiceUpdate(BaseModel):
    name: Optional[str] = Field(
        None,
        description="Nama Service (jika kosong Nama tidak di ubah)"
    )
    desc: Optional[str] = Field(
        None,
        description="Deskripsi Service (jika kosong Deskripsi tidak di ubah)"
    )
    icon: Optional[str] = Field(
        None,
        description="Icon Service (jika kosong Icon tidak di ubah)"
    )
    list_service: Optional[List[ListServiceUpdate]] = Field(
        None,
        description="List service yang bisa dilakukan (jika kosong tidak di ubah)"
    )

class ServiceRead(ServiceBase):
    id: int = Field(
        ...,
        description="ID Service"
    )
    list_service: List[ListServiceRead] = Field(
        ...,
        description="List service yang bisa dilakukan"
    )
    model_config = {
        "from_attributes": True
    }

class ServiceCount(BaseModel):
    total_services: int