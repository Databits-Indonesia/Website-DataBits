from sqlalchemy.orm import Session
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate
from app.services.activity import log_activity
from fastapi import HTTPException

def create_category(db: Session, data: CategoryCreate, user_id: int):
    category = Category(
        name=data.name,
        type=data.type
    )
    db.add(category)
    db.commit()
    db.refresh(category)

    log_activity(
        db=db,
        user_id=user_id,
        module="category",
        action="create",
        object_id=category.id,
        description=f"Category baru ditambahkan: {category.name}"
    )
    return category

def get_categories(db: Session):
    return db.query(Category).all()

def get_category_by_id(db: Session, category_id: int):
    return db.query(Category).filter(Category.id == category_id).first()

def get_categories_by_type(db: Session, type: int):
    return db.query(Category).filter(Category.type == type).all()

def update_category(db: Session, category_id: int, data: CategoryUpdate, user_id: int):
    category = get_category_by_id(db, category_id)

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    if data.name:
        category.name = data.name

    db.commit()
    db.refresh(category)

    log_activity(
        db=db,
        user_id=user_id,
        module="category",
        action="update",
        object_id=category.id,
        description=f"Edit category: {category.name}"
    )
    return category


def delete_category(db: Session, category_id: int, user_id: int):
    category = get_category_by_id(db, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(category)
    db.commit()

    log_activity(
        db=db,
        user_id=user_id,
        module="category",
        action="delete",
        object_id=category.id,
        description=f"Hapus category: {category.name}"
    )