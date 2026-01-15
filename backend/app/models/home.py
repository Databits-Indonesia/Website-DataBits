from sqlalchemy import Column, Integer, String, Date, Text
from app.core.database import Base

class Home(Base):
    __tablename__ = "home"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    desc = Column(Text(255), nullable=False)