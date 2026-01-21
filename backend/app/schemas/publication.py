from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PublicationBase(BaseModel):
    title: str = Field(
        ...,
        description="Judul artikel/paper"
    )
    writer: str = Field(
        ...,
        description="Penulis"
    )
    journal: str = Field(
        ...,
        description="Tempat publikasi/jurnal"
    )
    desc: str = Field(
        ...,
        description="Deskripsi singkat"
    )
    link: str = Field(
        ...,
        description="Link artikel/paper"
    )
    publication_date: datetime = Field(
        ...,
        description="Tanggal publikasi"
    )

class PublicationCreate(PublicationBase):
    pass

class PublicationUpdate(BaseModel):
    title: Optional[str] = Field(
        None,
        description="Judul artikel/paper (jika kosong tidak diubah)"
    )
    writer: Optional[str] = Field(
        None,
        description="Penulis (jika kosong tidak diubah)"
    )
    journal: Optional[str] = Field(
        None,
        description="Tempat publikasi/jurnal (jika kosong tidak diubah)"
    )
    desc: Optional[str] = Field(
        None,
        description="Deskripsi singkat (jika kosong tidak diubah)"
    )
    link: Optional[str] = Field(
        None,
        description="Link artikel/paper (jika kosong tidak diubah)"
    )
    publication_date: Optional[datetime] = Field(
        None,
        description="Tanggal publikasi (jika kosong tidak diubah)"
    )

class PublicationRead(PublicationBase):
    id: int = Field(
        ...,
        description="ID Publikasi"
    )
    model_config = {
        "from_attributes": True
    }

class PublicationCount(BaseModel):
    total_publications: int