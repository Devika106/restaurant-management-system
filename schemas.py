from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class FoodCreate(BaseModel):
    name: str
    price: float
    image_url: str
class FoodResponse(BaseModel):
    id: int
    name: str
    price: float
    image_url: str

    class Config:
        orm_mode = True
class OrderCreate(BaseModel):
    user_id: int
    items: list[str]
    total_price: float

class TableBookingCreate(BaseModel):
    table_number: str
    date: str
    time: str
    seats: int

