from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base

class SupCareer(Base):
    __tablename__ = "sup_career"

    id = Column(Integer, primary_key=True, index=True)
    superiority = Column(String(255), nullable=False)
    desc = Column(Text, nullable=False)
    icon = Column(String(255), nullable=False)

    def __repr__(self):
        return f"<Superiority {self.superiority}>"