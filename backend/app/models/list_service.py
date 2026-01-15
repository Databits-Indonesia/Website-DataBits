from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base

class ListService(Base):
    __tablename__ = "list_service"

    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey("services.id", ondelete="CASCADE"), nullable=False)
    service = Column(String(45), nullable=False)