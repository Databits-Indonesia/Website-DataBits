from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal

class ContactBase(BaseModel):
    email: EmailStr = Field(
        ...,
        description="Email databits"
    )
    headquarters: str = Field(
        ...,
        description="Markas databits"
    )

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    email: Optional[EmailStr] = Field(
        None,
        description="Email databits (jika kosong tidak diubah)"
    )
    headquarters: Optional[str] = Field(
        None,
        description="Markas databits (jika kosong tidak diubah)"
    )


class ContactRead(ContactBase):
    id: int = Field(
        ...,
        description="ID contact"
    )

    # class Config:
    #     from_attributes = True
    model_config = {
        "from_attributes": True
    }