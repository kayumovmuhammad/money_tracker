from pydantic import BaseModel

class CalculateSchema(BaseModel):
    frm: str = ""
    to: str = ""