from pydantic import BaseModel, EmailStr, Field

class LoginRequest(BaseModel):
    email_username: str = Field(
        ...,
        description="Email atau Username untuk login"
    )
    password: str = Field(
        ...,
        description="Password untuk login"
    )

class TokenResponse(BaseModel):
    # access_token: str
    message: str = Field(
        ...,
        description="Pesan login/logout sukses"
    )

class UserMe(BaseModel):
    sub: str = Field(
        ...,
        description="ID user yang login"
    )
    email: EmailStr = Field(
        ...,
        description="Email user yang login"
    )
    username: str = Field(
        ...,
        description="Username user yang login"
    )
    role: str = Field(
        ...,
        description="Role user yang login"
    )