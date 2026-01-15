from pydantic import BaseModel, Field
from typing import Optional

class ServiceBase(BaseModel):
    name: str = Field(
        ...,
        description="Nama Service"
    )
    desc: str = Field(
        ...,
        description="Deskripsi Service"
    )
    link: str = Field(
        ...,
        description="Link Service"
    )
    icon: str = Field(
        ...,
        description="Icon Service"
    )
    # image_url: str

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    name: Optional[str] = Field(
        None,
        description="Nama Service (jika kosong Nama tidak di ubah)"
    )
    desc: Optional[str] = Field(
        None,
        description="Deskripsi Service (jika kosong Deskripsi tidak di ubah)"
    )
    # image_url: Optional[str] = None

    link: Optional[str] = Field(
        None,
        description="Link Service (jika kosong Link tidak di ubah)"
    )
    icon: Optional[str] = Field(
        ...,
        description="Icon Service (jika kosong Icon tidak di ubah)"
    )

class ServiceRead(ServiceBase):
    id: int = Field(
        ...,
        description="ID Service"
    )
    # class Config:
    #     orm_mode = True
    model_config = {
        "from_attributes": True
    }

class ServiceCount(BaseModel):
    total_Service: int