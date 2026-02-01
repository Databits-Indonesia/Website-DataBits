from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from app.schemas.auth import LoginRequest, TokenResponse, UserMe
from app.core.database import get_db
from app.core.security import ACCESS_TOKEN_EXPIRE_MINUTES
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    from app.services.auth import login_user
    token = login_user(db, data.email_username, data.password)

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email/Username atau password salah (wrong)"
        )
    
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,      # True di production (HTTPS)
        samesite="lax",
        path="/",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

    return {"message": "login success"}

@router.post("/logout", response_model=TokenResponse)
def logout(response: Response):
    response.delete_cookie(key="access_token", path="/")
    return {"message": "logout succes"}

@router.get("/me", response_model=UserMe, description="API to retrieve logged in user data")
def me(user=Depends(get_current_user)):
    return user

