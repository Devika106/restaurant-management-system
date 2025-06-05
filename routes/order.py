from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import FoodOrder
from schemas import OrderCreate
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/order")
def place_order(order: OrderCreate, db: Session = Depends(get_db)):
    order_data = FoodOrder(user_id=order.user_id, items=",".join(order.items), total_price=order.total_price)
    db.add(order_data)
    db.commit()
    return {"message": "Order placed successfully"}

