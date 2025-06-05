from sqlalchemy.orm import Session
import models
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, username: str, password: str):
    hashed_password = get_password_hash(password)
    db_user = models.User(username=username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_food(db: Session, food):
    db_food = models.Food(
        name=food.name,
        description=food.description,
        price=food.price,
        image_url=food.image_url,
    )
    db.add(db_food)
    db.commit()
    db.refresh(db_food)
    return db_food

def get_foods(db: Session):
    return db.query(models.Food).all()

def get_tables(db: Session):
    return db.query(models.Table).all()

def create_order(db: Session, user_id: int, food_id: int):
    order = models.Order(user_id=user_id, food_id=food_id)
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

def book_table(db: Session, table_id: int):
    table = db.query(models.Table).filter(models.Table.id == table_id).first()
    if not table or table.booked:
        return None
    table.booked = True
    db.commit()
    db.refresh(table)
    return table
