from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AboutBase(BaseModel):
    title: str = Field(
        ...,
        description="Judul utama (halaman about)"
    )
    desc: str = Field(
        ...,
        description="Deskripsi ringkas (halaman about)"
    )
    our_philosophy: str = Field(
        ...,
        description="Filosofis Databits"
    )
    our_mission: str = Field(
        ...,
        description="Misi databits"
    )
    our_vision: str = Field(
        ...,
        description="Visi databits"
    )
    our_values: str = Field(
        ...,
        description="Values databits"
    )
    foundation: datetime = Field(
        ...,
        description="Tanggal pembuatan databits"
    )
    first_product_launch: datetime = Field(
        ...,
        description="Tanggal launching"
    )
    series_a_funding: datetime = Field(
        ...,
        description="Tanggal pendanaan series A?"
    )
    global_expansion: datetime = Field(
        ...,
        description="Tanggal ekspansi global"
    )

class AboutCreate(AboutBase):
    pass

class AboutUpdate(BaseModel):
    title: Optional[str] = Field(
        None,
        description="Judul utama (halaman about) (jika kosong tidak di ubah)"
    )
    desc: Optional[str] = Field(
        None,
        description="Deskripsi ringkas (halaman about) (jika kosong tidak di ubah)"
    )
    our_philosophy: Optional[str] = Field(
        None,
        description="Filosofis databits (jika kosong tidak di ubah)"
    )
    our_mission: Optional[str] = Field(
        None,
        description="Misi databits (jika kosong tidak di ubah)"
    )
    our_vision: Optional[str] = Field(
        None,
        description="Visi databits (jika kosong tidak di ubah)"
    )
    our_values: Optional[str] = Field(
        None,
        description="Values databits (jika kosong tidak di ubah)"
    )
    foundation: Optional[datetime] = Field(
        None,
        description="Tanggal pembuatan databits (jika kosong tidak di ubah)"
    )
    first_product_launch: Optional[datetime] = Field(
        None,
        description="Tanggal launching (jika kosong tidak di ubah)"
    )
    series_a_funding: Optional[datetime] = Field(
        None,
        description="Tanggal pendanaan series A? (jika kosong tidak di ubah)"
    )
    global_expansion: Optional[datetime] = Field(
        None,
        description="Tanggal ekspansi global (jika kosong tidak di ubah)"
    )

class AboutRead(AboutBase):
    id: int = Field(
        ...,
        description="ID About"
    )

    model_config = {
        "from_attributes": True
    }