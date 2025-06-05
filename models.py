from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy import Column, Integer, String, ForeignKey,Float
from sqlalchemy.ext.declarative import declarative_base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

class FoodItem(Base):
    __tablename__ = "food_items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    price = Column(Float)
    image_url = Column(String)

class TableBooking(Base):
    __tablename__ = "table_bookings"
    id = Column(Integer, primary_key=True, index=True)
    table_number = Column(String, nullable=False)          
    date = Column(String)
    time = Column(String)
    seats = Column(Integer)

class FoodOrder(Base):
    __tablename__ = "food_orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    items = Column(String)  
    total_price = Column(Float)

