from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from models import FoodItem
from schemas import FoodCreate, FoodResponse
from database import get_db

router = APIRouter(prefix="/food", tags=["food"])


@router.post("/", status_code=status.HTTP_201_CREATED)
def add_food(food: FoodCreate, db: Session = Depends(get_db)):
    new_item = FoodItem(**food.dict())
    db.add(new_item)
    db.commit()
    db.refresh(new_item)  
    return {"message": "Food item added", "id": new_item.id}


@router.get("/", response_model=list[FoodResponse])
def get_foods(db: Session = Depends(get_db)):
    return db.query(FoodItem).all()


@router.delete("/{food_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_food(food_id: int, db: Session = Depends(get_db)):
    food = db.query(FoodItem).filter(FoodItem.id == food_id).first()
    if not food:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Food with id={food_id} not found",
        )
    db.delete(food)
    db.commit()
    return
