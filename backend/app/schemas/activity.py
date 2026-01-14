from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ActivityRead(BaseModel):
    id: int = Field(..., description="ID unik aktivitas")
    user: Optional[str] = Field(
        None,
        description="User yang melakukan aktivitas"
    )
    module: str = Field(
        ...,
        description="Nama modul / fitur / tabel yang diubah (blog, service, product, dll)"
    )
    action: str = Field(
        ...,
        description="Jenis aktivitas: create, update, delete"
    )
    object_id: int = Field(
        ...,
        description="ID data yang diubah"
    )
    description: str = Field(
        ...,
        description="Keterangan aktivitas yang ditampilkan di dashboard"
    )
    created_at: datetime = Field(
        ...,
        description="Waktu aktivitas terjadi"
    )

    # class Config:
    #     orm_mode = True

    model_config = {
        "from_attributes": True
    }