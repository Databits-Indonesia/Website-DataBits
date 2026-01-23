from fastapi import APIRouter, Depends, Request, Query
from sqlalchemy.orm import Session
from typing import List
from app.schemas.blog import BlogRead
from app.schemas.target_lang import Language
from app.services.blog import get_blogs, get_blog_by_id, register_blog_view
from app.services.translate import translate
from app.core.database import get_db

router = APIRouter(
    prefix="/public/blogs",
    tags=["Blogs Public"]
)

@router.get("", response_model=List[BlogRead])
def list_blogs(db: Session = Depends(get_db)):
    return get_blogs(db)

@router.get("/{blog_id}", response_model=BlogRead)
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

@router.post("/{blog_id}/view")
def count_view(blog_id: int, request: Request, db: Session = Depends(get_db)):
    count = register_blog_view(db, blog_id, request)
    if count:
        return {"counted": True}
    else:
        return {"counted": False}