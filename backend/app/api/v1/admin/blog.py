from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.schemas.blog import (
    BlogCreate, BlogCreate2, 
    BlogRead, BlogUpdate, 
    BlogUpdate2, BlogCount
)
from app.schemas.delete_msg import DeleteMSG
from app.schemas.target_lang import Language
from app.services.blog import (
    create_blog,
    get_blogs,
    get_blog_by_id,
    update_blog,
    delete_blog,
    upload_cover,
    count_blogs
)
from app.services.translate import translate
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
def create(data: BlogCreate = Depends(), db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    image = validate_image_file(data.image)
    cover_url = upload_cover(image)
    data = BlogCreate2(title=data.title, content=data.content, cover_url=cover_url, category_id=data.category_id)
    return create_blog(db, data, user_id)

@router.get("", response_model=List[BlogRead], dependencies=[Depends(admin_or_owner)])
async def list_blogs(target_lang: Language = Query("id"), db: Session = Depends(get_db)):
    FIELDS = [
        "title",
        "content",
    ]
    blogs = get_blogs(db)
    if not blogs:
        return []
    
    for obj in blogs:
        data = [getattr(obj, f) for f in FIELDS]
        translated = await translate(data, target_lang)
        
        for f, value in zip(FIELDS, translated):
            setattr(obj, f, value)
    return blogs

@router.get("/{blog_id}", response_model=BlogRead, dependencies=[Depends(admin_or_owner)])
async def blog_detail(blog_id: int, target_lang: Language = Query("id"), db: Session = Depends(get_db)):
    blog = get_blog_by_id(db, blog_id)
    blog.title, blog.content = await translate([blog.title, blog.content], target_lang)
    return BlogRead(
            id=blog.id,
            title=blog.title,
            content=blog.content,
            cover_url=blog.cover_url,
            views=blog.views,
            created_at=blog.created_at,
            user=blog.user.username,
            category=blog.category.name
        )

@router.get("/stats/count", response_model=BlogCount, dependencies=[Depends(admin_or_owner)])
def blogs_count(db: Session = Depends(get_db)):
    total = count_blogs(db)
    return {"total_blogs": total}

@router.put("/{blog_id}", response_model=BlogRead, dependencies=[Depends(admin_or_owner)])
def update(blog_id: int, data: BlogUpdate = Depends(), db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    image = validate_image_file_optional(data.image)
    cover_url = upload_cover(image) if image else None
    data = BlogUpdate2(title=data.title, content=data.content, cover_url=cover_url, category_id=data.category_id)
    return update_blog(db, blog_id, data, user_id)

@router.delete("/{blog_id}", response_model=DeleteMSG, dependencies=[Depends(admin_or_owner)])
def delete(blog_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    delete_blog(db, blog_id, user_id)
    return {"message": "Blog deleted"}