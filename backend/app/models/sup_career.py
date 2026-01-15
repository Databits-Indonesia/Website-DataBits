from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    superiority = Column(String(255), nullable=False)
    desc = Column(Text, nullable=False)
    icon = Column(String(255), nullable=False)

    def __repr__(self):
        return f"<Product {self.name}>"