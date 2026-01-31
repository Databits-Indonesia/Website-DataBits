from sqlalchemy.orm import Session
from app.models.blog import Blog
from app.models.blog_view import BlogView
from sqlalchemy.orm import joinedload
from app.schemas.blog import (
    BlogCreate2,
    BlogUpdate2, 
    BlogRead
)
from fastapi import HTTPException, UploadFile, Request
from app.services.activity import log_activity
import uuid, os
from datetime import datetime, timedelta, timezone

UPLOAD_DIR = "app/uploads/blog"

def create_blog(db: Session, data: BlogCreate2, user_id: int):
    blog = Blog(
        slug=data.slug,
        title=data.title,
        content=data.content,
        cover_url=data.cover_url,
        user_id=user_id,
        category_id=data.category_id,
    )
    db.add(blog)
    db.commit()
    db.refresh(blog)
    log_activity(
        db=db,
        user_id=user_id,
        module="blog",
        action="create",
        object_id=blog.id,
        description=f"Blog baru ditambahkan: {blog.title}"
    )
    return BlogRead(
            id=blog.id,
            slug=data.slug,
            title=blog.title,
            content=blog.content,
            cover_url=blog.cover_url,
            views=blog.views,
            created_at=blog.created_at,
            user=blog.user.username,
            category=blog.category.name
        )

def get_blogs(db: Session):
    blogs = (
            db.query(Blog)
            .options(
                joinedload(Blog.user), 
                joinedload(Blog.category)
            )
            .order_by(Blog.created_at.desc())
            .all()
        )

    return [
        BlogRead(
            id=blog.id,
            slug=blog.slug,
            title=blog.title,
            content=blog.content,
            cover_url=blog.cover_url,
            views=blog.views,
            created_at=blog.created_at,
            user=blog.user.username,
            category=blog.category.name
        )
        for blog in blogs
    ]


def get_blog_by_id(db: Session, blog_id: int):
    return db.query(Blog).filter(Blog.id == blog_id).first()

def update_blog(db: Session, blog_id: int, data: BlogUpdate2, user_id: int):
    blog = get_blog_by_id(db, blog_id)

    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    if data.slug:
        blog.slug = data.slug

    if data.title:
        blog.title = data.title

    if data.content:
        blog.content = data.content

    if data.cover_url:
        try:
            delete_cover_image(blog.cover_url)
        except:
            pass
        blog.cover_url = data.cover_url

    if data.category_id:
        blog.category_id = data.category_id

    db.commit()
    db.refresh(blog)

    log_activity(
        db=db,
        user_id=user_id,
        module="blog",
        action="update",
        object_id=blog.id,
        description=f"Edit blog: {blog.title}"
    )
    return BlogRead(
            id=blog.id,
            title=blog.title,
            slug=blog.slug,
            content=blog.content,
            cover_url=blog.cover_url,
            views=blog.views,
            created_at=blog.created_at,
            user=blog.user.username,
            category=blog.category.name
        )

def delete_blog(db: Session, blog_id: int, user_id: int):
    blog = get_blog_by_id(db, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    cover_url = blog.cover_url
    db.delete(blog)
    db.commit()
    try:
        delete_cover_image(cover_url)
    except:
        pass

    log_activity(
        db=db,
        user_id=user_id,
        module="blog",
        action="delete",
        object_id=blog.id,
        description=f"Hapus blog: {blog.title}"
    )

def upload_cover(image: UploadFile):
    ext = os.path.splitext(image.filename)[1].lower()
    filename = f"{uuid.uuid4()}{ext}"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as buffer:
        buffer.write(image.file.read())
    image_url = f"/static/blog/{filename}"
    return image_url

def delete_cover_image(image_url: str):
    if not image_url:
        return

    file_path = image_url.replace("/static/blog/", "")
    full_path = os.path.join(UPLOAD_DIR, file_path)

    if os.path.exists(full_path):
        os.remove(full_path)

def get_client_ip(request: Request) -> str:
    x_forwarded_for = request.headers.get("x-forwarded-for")
    if x_forwarded_for:
        return x_forwarded_for.split(",")[0].strip()

    return request.client.host

def register_blog_view(db: Session, blog_id: int, request: Request):
    ip = get_client_ip(request)

    time_limit = datetime.now(timezone.utc) - timedelta(hours=24)

    exists = db.query(BlogView).filter(
        BlogView.blog_id == blog_id,
        BlogView.ip_address == ip,
        BlogView.viewed_at >= time_limit
    ).first()

    if exists:
        return False

    db.add(BlogView(blog_id=blog_id, ip_address=ip))
    db.query(Blog).filter(Blog.id == blog_id).update({Blog.views: Blog.views + 1})
    db.commit()

    return True

def count_blogs(db: Session):
    return db.query(Blog).count()