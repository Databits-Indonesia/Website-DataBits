from sqlalchemy import Column, Integer, String,  DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime, timezone

class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    views = Column(Integer, default=0)
    cover_url = Column(String(255), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )
    category_id = Column(
        Integer,
        ForeignKey("categories.id", ondelete="CASCADE"),
        nullable=False
    )
    category = relationship("Category", back_populates="blogs")
    user = relationship("User", back_populates="blogs")
    views_logs = relationship(
        "BlogView",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    def __repr__(self):
        return f"<Blog {self.title}>"

    