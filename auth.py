from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models import User
from database import SessionLocal
from schemas import UserCreate
import hashlib

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    
    new_user = User(username=user.username, password=hash_password(user.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)  

    return {"message": "User registered successfully", "user_id": new_user.id}

@router.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    hashed_pw = hash_password(user.password)
    db_user = db.query(User).filter(User.username == user.username, User.password == hashed_pw).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    return {"message": "Login successful", "user": {"id": db_user.id, "username": db_user.username}}
