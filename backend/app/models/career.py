from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.core.database import Base

class Career(Base):
    __tablename__ = "careers"

    id = Column(Integer, primary_key=True, index=True)
    position = Column(String(255), nullable=False)
    category_id = Column(
        Integer,
        ForeignKey("categories.id", ondelete="CASCADE"),
        nullable=False
    )
    work_mode = Column(String(255), nullable=False)
    job_type = Column(String(255), nullable=False)
    desc = Column(Text, nullable=False)
    apply_link = Column(String(255), nullable=False)