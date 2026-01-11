from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255, collation="utf8mb4_bin"), unique=True, nullable=False, index=True)
    username = Column(String(255, collation="utf8mb4_bin"), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(
        Enum("admin", "owner", name="user_roles"),
        nullable=False,
        default="admin"
    )
    blogs = relationship(
        "Blog",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User id={self.id} email={self.email} role={self.role}>"