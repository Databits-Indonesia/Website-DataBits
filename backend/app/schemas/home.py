from pydantic import BaseModel, Field
from typing import Optional

class HomeBase(BaseModel):
    title: str = Field(
        ...,
        description="Judul utama (beranda)"
    )
    desc: str = Field(
        ...,
        description="Deskripsi ringkas (beranda)"
    )

class HomeCreate(HomeBase):
    pass

class HomeUpdate(BaseModel):
    title: Optional[str] = Field(
        None,
        description="Judul utama (beranda) (jika kosong tidak di ubah)"
    )
    desc: Optional[str] = Field(
        None,
        description="Deskripsi ringkas (beranda) (jika kosong tidak di ubah)"
    )

class HomeRead(HomeBase):
    id: int = Field(
        ...,
        description="ID Home"
    )

    model_config = {
        "from_attributes": True
    }