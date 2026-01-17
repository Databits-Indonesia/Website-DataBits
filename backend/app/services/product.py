from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate
from app.services.activity import log_activity

def create_product(db: Session, data: ProductCreate, user_id: int):
    product = Product(
        name=data.name,
        desc=data.desc,
        link=data.link,
        icon=data.icon,
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    log_activity(
        db=db,
        user_id=user_id,
        module="product",
        action="create",
        object_id=product.id,
        description=f"Product baru ditambahkan: {product.name}"
    )
    return product


def get_products(db: Session):
    return db.query(Product).all()


def get_product_by_id(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()


def update_product(db: Session, product_id: int, data: ProductUpdate, user_id: int):
    product = get_product_by_id(db, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if data.name:
        product.name = data.name

    if data.desc:
        product.desc = data.desc

    if data.link:
        product.link = data.link

    if data.icon:
        product.icon = data.icon

    db.commit()
    db.refresh(product)

    log_activity(
        db=db,
        user_id=user_id,
        module="product",
        action="update",
        object_id=product.id,
        description=f"Edit data product: {product.name}"
    )
    return product

def delete_product(db: Session, product_id: int, user_id: int):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()

    log_activity(
        db=db,
        user_id=user_id,
        module="product",
        action="delete",
        object_id=product.id,
        description=f"Hapus Product: {product.name}"
    )

def count_products(db: Session):
    return db.query(Product).count()