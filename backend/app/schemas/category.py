from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class CategoryType(str, Enum):
    PROJECT = "project"
    BLOG = "blog"
    RESEARCH = "research"
    CAREERS = "career"

class CategoryBase(BaseModel):
    name: str = Field(
        ...,
        description="Nama Kategori"
    )
    type: CategoryType = Field(
        ...,
        description="Kategori untuk ..."
    )

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = Field(
        None,
        description="Nama Kategori (jika kosong Nama Kategori tidak di ubah)"
    )

class CategoryRead(CategoryBase):
    id: int = Field(
        ...,
        description="ID Kategori"
    )

    # class Config:
    #     orm_mode = True
    model_config = {
        "from_attributes": True
    }