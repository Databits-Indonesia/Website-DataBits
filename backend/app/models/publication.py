from sqlalchemy import Column, Integer, String,  DateTime, Text, Date
from app.core.database import Base
from datetime import datetime, timezone

class Publication(Base):
    __tablename__ = "publications"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    writer = Column(String(255), nullable=False)
    journal = Column(String(255), nullable=False)
    desc = Column(Text, nullable=False)
    link = Column(String(255), nullable=False)
    publication_date = Column(Date, nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    def __repr__(self):
        return f"<Publication {self.title}>"

    