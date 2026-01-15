from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class MessageBase(BaseModel):
    name: str = Field(
        ...,
        description="Nama Pengirim"
    )
    email: EmailStr = Field(
        ...,
        description="Email"
    )
    # telephone: str
    subject: str = Field(
        ...,
        description="Subject Pesan"
    )
    company: str = Field(
        ...,
        description="Company"
    )
    message_content: str = Field(
        ...,
        description="Pesan"
    )

class MessageCreate(MessageBase):
    pass

class MessageRead(MessageBase):
    id: int = Field(
        ...,
        description="ID Message"
    )
    # class Config:
    #     orm_mode = True
    model_config = {
        "from_attributes": True
    }

class MessageCount(BaseModel):
    total_message: int