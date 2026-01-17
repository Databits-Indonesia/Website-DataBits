from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.home import (
    HomeRead, 
)
from app.services.home import (
    get_home,
)
from app.core.database import get_db

router = APIRouter(
    prefix="/public/home_page",
    tags=["Home Page Public"]
)

@router.get("", response_model=List[HomeRead])
def read_home_page(db: Session = Depends(get_db)):
    return get_home(db)