from pydantic import BaseModel, Field
from typing import Optional

class ResearchBase(BaseModel):
    title: str = Field(
        ...,
        description="Judul Riset"
    )
    desc: str = Field(
        ...,
        description="Deskripsi Riset"
    )
    link: str = Field(
        ...,
        description="Link Riset"
    )
    category_id: int = Field(
        ...,
        description="ID Kategori untuk Riset"
    )
    # image_url: str

class ResearchCreate(ResearchBase):
    pass

class ResearchUpdate(BaseModel):
    title: Optional[str] = Field(
        None,
        description="Judul Riset (jika kosong Judul tidak di ubah)"
    )
    desc: Optional[str] = Field(
        None,
        description="Deskripsi Riset (jika kosong Deskripsi tidak di ubah)"
    )

    link: Optional[str] = Field(
        None,
        description="Link Riset (jika kosong Link tidak di ubah)"
    )
    category_id: Optional[int] = Field(
        None,
        description="ID Kategori Riset (jika kosong ID Kategori tidak di ubah)"
    )

class ResearchRead(ResearchBase):
    id: int = Field(
        ...,
        description="ID Produk"
    )

    model_config = {
        "from_attributes": True
    }

class ResearchCount(BaseModel):
    total_researchs: int