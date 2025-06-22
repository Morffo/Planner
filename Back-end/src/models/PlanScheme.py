from pydantic import BaseModel

class PlanScheme(BaseModel):
    title: str
    description: str
    content: str