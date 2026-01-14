from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal

class UserBase(BaseModel):
    email: EmailStr = Field(
        ...,
        description="Email user"
    )
    username: str = Field(
        ...,
        description="Username user"
    )
    role: Literal["admin", "owner"]

class UserCreate(UserBase):
    password: str = Field(
        ...,
        description="Password user"
    )

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = Field(
        None,
        description="Email user (jika kosong tidak diubah)"
    )
    username: Optional[str] = Field(
        None,
        description="username user (jika kosong tidak diubah)"
    )
    role: Optional[Literal["admin", "owner"]] = Field(
        None,
        description="Role user (jika kosong tidak diubah)"
    )
    password: Optional[str] = Field(
        None,
        description="Password user (jika kosong tidak diubah)"
    )


class UserResponse(UserBase):
    id: int = Field(
        ...,
        description="ID user"
    )

    # class Config:
    #     from_attributes = True
    model_config = {
        "from_attributes": True
    }

class UserCount(BaseModel):
    total_users: int