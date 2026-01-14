from sqlalchemy import Column, Integer, String, Date, Text
from app.core.database import Base

class About(Base):
    __tablename__ = "about"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    desc = Column(Text(255), nullable=False)
    our_philosophy = Column(Text, nullable=False)
    our_mission = Column(Text, nullable=False)
    our_vision = Column(Text, nullable=False)
    our_values = Column(Text, nullable=False)
    foundation = Column(Date, nullable=False)
    first_product_launch = Column(Date, nullable=False)
    series_a_funding = Column(Date, nullable=False)
    global_expansion = Column(Date, nullable=False)