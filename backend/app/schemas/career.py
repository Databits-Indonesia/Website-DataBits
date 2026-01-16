from pydantic import BaseModel, Field
from typing import Optional

class CareerBase(BaseModel):
    position: str = Field(
        ...,
        description="Posisi"
    )
    work_mode: str = Field(
        ...,
        description="Mode pekerjaan (remote, di tempat, dll)"
    )
    job_type: str = Field(
        ...,
        description="Jenis pekerjaan (full-time, freelance, dll)"
    )
    desc: str = Field(
        ...,
        description="Deskripsi pekerjaan"
    )
    apply_link: str = Field(
        ...,
        description="Link apply"
    )
    category_id: int = Field(
        ...,
        description="ID Kategori untuk karir"
    )
    # image_url: str

class CareerCreate(CareerBase):
    pass

class CareerUpdate(BaseModel):
    position: Optional[str] = Field(
        None,
        description="Posisi (jika kosong tidak diubah)"
    )
    work_mode: Optional[str] = Field(
        None,
        description="Mode pekerjaan (remote, di tempat, dll) (jika kosong tidak diubah)"
    )
    job_type: Optional[str] = Field(
        None,
        description="Jenis pekerjaan (full-time, freelance, dll) (jika kosong tidak diubah)"
    )
    desc: Optional[str] = Field(
        None,
        description="Deskripsi pekerjaan (jika kosong tidak diubah)"
    )
    apply_link: Optional[str] = Field(
        None,
        description="Link apply (jika kosong tidak diubah)"
    )
    category_id: Optional[int] = Field(
        None,
        description="ID Kategori untuk karir (jika kosong tidak diubah)"
    )

class CareerRead(CareerBase):
    id: int = Field(
        ...,
        description="ID karir"
    )

    model_config = {
        "from_attributes": True
    }

class CareerCount(BaseModel):
    total_career: int