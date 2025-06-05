from fastapi import FastAPI
from database import Base, engine
from auth import router as auth_router
from routes.food import router as food_router
from routes.order import router as order_router
from routes.table import router as table_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


Base.metadata.create_all(bind=engine)

app = FastAPI()


origins = [
    "http://localhost:5173",  
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/static", StaticFiles(directory="static"), name="static")


app.include_router(auth_router)  
app.include_router(food_router)
app.include_router(order_router)
app.include_router(table_router)

@app.get("/")
def root():
    return {"message": "Restaurant API working"}
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)