from pydantic import BaseModel, Field
from typing import Optional
from fastapi import UploadFile

class ProjectBase(BaseModel):
    title: str = Field(
        ...,
        description="Judul project"
    )
    desc: str = Field(
        ...,
        description="Deskripsi project"
    )
    link: str = Field(
        ...,
        description="Link project"
    )

class ProjectCreate(ProjectBase):
    image: UploadFile = Field(
        ...,
        description="File image cover project"
    )
    category_id: int = Field(
        ...,
        description="ID Kategori untuk project"
    )

class ProjectCreate2(ProjectBase):
    cover_url: str = Field(
        ...,
        description="Url cover project"
    )
    category_id: int = Field(
        ...,
        description="ID Kategori untuk project"
    )

class ProjectUpdate(BaseModel):
    title: Optional[str] = Field(
        None,
        description="Judul project (jika kosong Judul tidak di ubah)"
    )
    desc: Optional[str] = Field(
        None,
        description="Deskripsi project (jika kosong Deskripsi tidak di ubah)"
    )
    image: Optional[UploadFile] = Field(
        None,
        description="File image cover project (jika kosong tidak di ubah)"
    )
    link: Optional[str] = Field(
        None,
        description="Link project (jika kosong Link tidak di ubah)"
    )
    category_id: Optional[int] = Field(
        None,
        description="ID Kategori project (jika kosong ID Kategori tidak di ubah)"
    )

class ProjectUpdate2(BaseModel):
    title: Optional[str] = Field(
        None,
        description="Judul project (jika kosong Judul tidak di ubah)"
    )
    desc: Optional[str] = Field(
        None,
        description="Deskripsi project (jika kosong Deskripsi tidak di ubah)"
    )
    cover_url: Optional[str] = Field(
        None,
        description="Url cover project (jika kosong tidak di ubah)"
    )
    link: Optional[str] = Field(
        None,
        description="Link project (jika kosong Link tidak di ubah)"
    )
    category_id: Optional[int] = Field(
        None,
        description="ID Kategori project (jika kosong ID Kategori tidak di ubah)"
    )

class ProjectRead(ProjectBase):
    id: int = Field(
        ...,
        description="ID Project"
    )
    cover_url: str = Field(
        ...,
        description="Url cover project"
    )
    category: int = Field(
        ...,
        description="Kategori project"
    )
    model_config = {
        "from_attributes": True
    }

class ProjectCount(BaseModel):
    total_projects: int