from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import TableBooking
from schemas import TableBookingCreate
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/book-table")
def book_table(data: TableBookingCreate, db: Session = Depends(get_db)):
    booking = TableBooking(**data.dict())
    db.add(booking)
    db.commit()
    return {"message": "Table booked successfully"}

@router.get("/")
def get_all_table_bookings(db: Session = Depends(get_db)):
    return db.query(TableBooking).all()
