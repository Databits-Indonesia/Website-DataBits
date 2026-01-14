from sqlalchemy import Column, Integer, String,  DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime, timezone

class Research(Base):
    __tablename__ = "researches"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    desc = Column(Text, nullable=False)
    cover_url = Column(String(255), nullable=False)
    link = Column(String(255), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    category_id = Column(
        Integer,
        ForeignKey("categories.id", ondelete="CASCADE"),
        nullable=False
    )
    category = relationship("Category", back_populates="researches")

    def __repr__(self):
        return f"<Research {self.title}>"

    