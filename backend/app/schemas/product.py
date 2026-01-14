from pydantic import BaseModel, Field
from typing import Optional

class ProductBase(BaseModel):
    name: str = Field(
        ...,
        description="Nama Produk"
    )
    desc: str = Field(
        ...,
        description="Deskripsi Produk"
    )
    link: str = Field(
        ...,
        description="Link Produk"
    )
    # image_url: str

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = Field(
        None,
        description="Nama Produk (jika kosong Nama tidak di ubah)"
    )
    desc: Optional[str] = Field(
        None,
        description="Deskripsi Produk (jika kosong Deskripsi tidak di ubah)"
    )
    # image_url: Optional[str] = None

    link: Optional[str] = Field(
        None,
        description="Link Produk (jika kosong Link tidak di ubah)"
    )

class ProductRead(ProductBase):
    id: int = Field(
        ...,
        description="ID Produk"
    )
    # class Config:
    #     orm_mode = True
    model_config = {
        "from_attributes": True
    }

class ProductCount(BaseModel):
    total_product: int