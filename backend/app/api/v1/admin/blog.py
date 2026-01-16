from fastapi import APIRouter, Depends, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas.blog import BlogCreate, BlogRead, BlogUpdate, BlogCount
from app.services.blog import (
    create_blog,
    get_blogs,
    get_blog_by_id,
    update_blog,
    delete_blog,
    upload_cover,
    count_blogs
)
from app.core.database import get_db
from app.core.dependencies import (
    admin_or_owner, 
    validate_image_file,
    validate_image_file_optional,
    get_current_user
)

router = APIRouter(
    prefix="/blogs",
    tags=["Blogs"]
)

@router.post("", response_model=BlogRead, dependencies=[Depends(admin_or_owner)])
def create(title: str = Form(...), 
           content: str = Form(...),
           image: UploadFile = Depends(validate_image_file), 
           db: Session = Depends(get_db),
           current_user = Depends(get_current_user)):
    data = BlogCreate(title=title, content=content)
    user_id = int(current_user["sub"])
    cover_url = upload_cover(image)
    return create_blog(db, data, cover_url, user_id)

@router.get("", response_model=List[BlogRead], dependencies=[Depends(admin_or_owner)])
def list_blogs(db: Session = Depends(get_db)):
    return get_blogs(db)

@router.get("/{blog_id}", response_model=BlogRead, dependencies=[Depends(admin_or_owner)])
def blog_detail(blog_id: int, db: Session = Depends(get_db)):
    return get_blog_by_id(db, blog_id)

@router.get("/stats/count", response_model=BlogCount, dependencies=[Depends(admin_or_owner)])
def user_count(db: Session = Depends(get_db)):
    total = count_blogs(db)
    return {"total_user": total}

@router.put("/{blog_id}", response_model=BlogRead, dependencies=[Depends(admin_or_owner)])
def update(blog_id: int, 
           title: Optional[str] = Form(None), 
           content: Optional[str] = Form(None),
           image: Optional[UploadFile] = Depends(validate_image_file_optional), 
           db: Session = Depends(get_db),
           current_user = Depends(get_current_user)):
    data = BlogUpdate(title=title, content=content)
    user_id = int(current_user["sub"])
    cover_url = upload_cover(image) if image else None
    return update_blog(db, blog_id, data, cover_url, user_id)


@router.delete("/{blog_id}", dependencies=[Depends(admin_or_owner)])
def delete(blog_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_blog(db, blog_id, user_id)
    return {"message": "Blog deleted"}