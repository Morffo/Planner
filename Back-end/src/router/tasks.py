from fastapi import APIRouter
from pydantic import BaseModel
from models.TaskScheme import TaskScheme
from core.database import task
router = APIRouter(prefix="/tasks")


tasks = []

def task_deleter(title):
    for i in tasks:
        if i.title == title:
            tasks.pop(tasks.index(i))

@router.get("/")
async def all_tasks():
    return task.get_all()

@router.post("/{title}")
async def create_task(title: str):
    task.create_task(TaskScheme(title=title))
    return f"Task {title} added successfully!"

@router.delete("/{title}")
async def delete_task(title: str):
    task_deleter(title)
    return f"Task {title} was deleted successfuly"
