from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from router import tasks
from router import plans


app = FastAPI() 


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Или "*" для всех (небезопасно для продакшена)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)


@app.get("/")
async def main_page():
    return "It's main page, mate!"

app.include_router(tasks.router)
app.include_router(plans.router)