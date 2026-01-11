from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class CategoryType(enum.Enum):
    PRODUCT = "product"
    BLOG = "blog"
    RESEARCH = "research"

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)

    type = Column(
        Enum(CategoryType),
        nullable=False
    )

    blogs = relationship(
        "Blog",
        back_populates="category",
        cascade="all, delete",
        passive_deletes=True
    )

    # products = relationship(
    #     "Product",
    #     back_populates="category",
    #     cascade="all, delete",
    #     passive_deletes=True
    # )

    def __repr__(self):
        return f"<Category {self.name} ({self.type})>"