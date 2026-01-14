from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

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
    pass

class BlogUpdate(BaseModel):
    title: Optional[str] = Field(
        None,
        description="Judul Blog (jika kosong judul blog tidak di ubah)"
    )
    content: Optional[str] = Field(
        None,
        description="Content Blog (jika kosong content blog tidak di ubah)"
    )
    # cover_url: Optional[str] = None

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