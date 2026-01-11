from fastapi import Depends, HTTPException, status, UploadFile, File, Request, Form
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from typing import Optional
from app.core.security import SECRET_KEY, ALGORITHM
from PIL import Image, UnidentifiedImageError
import os
import re
from dotenv import load_dotenv

load_dotenv()

PHONE_REGEX = r'^\+62[0-9]{9,13}$'
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    # if os.getenv("ENV") == "development": 
    #   return { # "sub": "1", # "role": "owner" # }
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )


def admin_only(user=Depends(get_current_user)):
    if user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin only"
        )
    return user


def owner_only(user=Depends(get_current_user)):
    if user.get("role") != "owner":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Owner only"
        )
    return user


def admin_or_owner(user=Depends(get_current_user)):
    if user.get("role") not in ["admin", "owner"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden"
        )
    return user

def validate_image_file(file: UploadFile = File(...)) -> UploadFile:
    """
    Accepts ALL valid image formats
    """
    try:
        Image.open(file.file).verify()
        file.file.seek(0)
    except UnidentifiedImageError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File is not a valid image"
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to validate image"
        )

    return file

def validate_image_file_optional(file: Optional[UploadFile] = File(None)) -> Optional[UploadFile]:
    if file is None:
        return None
    try:
        Image.open(file.file).verify()
        file.file.seek(0)
    except UnidentifiedImageError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="File is not a valid image")
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Failed to validate image")
    return file


def validate_phone(telephone: str = Form(...)):
    if not re.match(PHONE_REGEX, telephone):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Format nomor telepon tidak valid. Gunakan format +628xxxxxxxxxx"
        )
    return telephone

def validate_phone_optional(telephone: Optional[str] = Form(None)):
    if not re.match(PHONE_REGEX, telephone):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Format nomor telepon tidak valid. Gunakan format +628xxxxxxxxxx"
        )
    return telephone