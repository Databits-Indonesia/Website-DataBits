from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base

class Message(Base):
    __tablename__ = "message"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=False, nullable=False, index=True)
    subject = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    message_content = Column(Text, nullable=False)

    def __repr__(self):
        return f"<Message {self.name}>"