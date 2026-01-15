from pydantic import BaseModel, Field
from typing import Optional

class SupCareerBase(BaseModel):
    superiority: str = Field(
        ...,
        description="keunggulan"
    )
    desc: str = Field(
        ...,
        description="Deskripsi ringkas tentang databits"
    )
    icon: str = Field(
        ...,
        description="Icon karir"
    )

class SupCareerCreate(SupCareerBase):
    pass

class SupCareerUpdate(BaseModel):
    superiority: Optional[str] = Field(
        ...,
        description="keunggulan (jika kosong tidak diubah)"
    )
    desc: Optional[str] = Field(
        ...,
        description="Deskripsi ringkas tentang databits (jika kosong tidak diubah)"
    )
    icon: Optional[str] = Field(
        ...,
        description="Icon karir (jika kosong tidak diubah)"
    )


class SupCareerRead(SupCareerBase):
    id: int = Field(
        ...,
        description="ID Superiority Career"
    )

    model_config = {
        "from_attributes": True
    }