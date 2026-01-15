from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AboutBase(BaseModel):
    title: str = Field(
        ...,
        description="Judul utama (beranda)"
    )
    desc: str = Field(
        ...,
        description="Deskripsi ringkas (beranda)"
    )

class AboutCreate(AboutBase):
    pass

class AboutUpdate(BaseModel):
    title: Optional[str] = Field(
        None,
        description="Judul utama (beranda) (jika kosong tidak di ubah)"
    )
    desc: Optional[str] = Field(
        None,
        description="Deskripsi ringkas (beranda) (jika kosong tidak di ubah)"
    )

class AboutRead(AboutBase):
    id: int = Field(
        ...,
        description="ID Home"
    )

    model_config = {
        "from_attributes": True
    }