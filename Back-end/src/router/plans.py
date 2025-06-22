from fastapi import APIRouter, HTTPException, Header, Body
from models.PlanScheme import PlanScheme
from typing import Optional
from pydantic import BaseModel
from core.database import plan

router = APIRouter(prefix="/plans")

plans = [

]

@router.get("/")
async def all_plans():
    return plan.get_all()

@router.post("/")
async def create_plan(plan: PlanScheme):
    plans.append(plan)

class PlanUpdate(BaseModel):
    content: str  # Теперь ожидаем только content

@router.put("/update-content")
async def update_plan_content(
    content_update: PlanUpdate = Body(...),  # Явно указываем, что берём из тела
    x_plan_title: str = Header(..., alias="X-Plan-Title")
):
    if not x_plan_title:
        raise HTTPException(status_code=400, detail="Заголовок X-Plan-Title обязателен")
    
    # Находим план для обновления
    found_index = None
    for i, plan in enumerate(plans):
        if plan.title == x_plan_title:
            found_index = i
            break
    
    if found_index is None:
        raise HTTPException(status_code=404, detail="План не найден")
    
    # Обновляем только content (остальные поля оставляем как есть)
    plans[found_index].content = content_update.content
    
    return {"message": "Контент плана обновлен", "plan": plans[found_index]}