from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from fastapi import UploadFile

class BlogBase(BaseModel):
    title: str = Field(
        ...,
        description="Judul Blog"
    )
    content: str = Field(
        ...,
        description="Content Blog"
    )

class BlogCreate(BlogBase):
    image: UploadFile = Field(
        ...,
        description="File Image Cover Blog"
    )

class BlogCreate2(BlogBase):
    cover_url: str = Field(
        ...,
        description="Url Cover Blog"
    )

class BlogUpdate(BaseModel):
    title: Optional[str] = Field(
        None,
        description="Judul Blog (jika kosong judul blog tidak di ubah)"
    )
    content: Optional[str] = Field(
        None,
        description="Content Blog (jika kosong content blog tidak di ubah)"
    )
    image: Optional[UploadFile] = Field(
        None,
        description="File Image Cover Blog (jika kosong tidak di ubah)"
    )

class BlogUpdate2(BaseModel):
    title: Optional[str] = Field(
        None,
        description="Judul Blog (jika kosong judul blog tidak di ubah)"
    )
    content: Optional[str] = Field(
        None,
        description="Content Blog (jika kosong content blog tidak di ubah)"
    )
    cover_url: Optional[str] = Field(
        None,
        description="Url Cover Blog (jika kosong tidak di ubah)"
    )

class BlogRead(BlogBase):
    id: int = Field(
        ...,
        description="ID Blog"
    )
    cover_url: str = Field(
        ...,
        description="Url Cover Blog"
    )
    views: int = Field(
        ...,
        description="Jumlah Pembaca Blog"
    )
    created_at: datetime = Field(
        ...,
        description="Waktu Blog dibuat"
    )
    user: str = Field(
        ...,
        description="Username yang buat blog"
    )

    # class Config:
    #     orm_mode = True
    model_config = {
        "from_attributes": True
    }

class BlogCount(BaseModel):
    total_blogs: int