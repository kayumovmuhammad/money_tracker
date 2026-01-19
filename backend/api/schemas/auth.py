from pydantic import BaseModel


class LoginSchema(BaseModel):
    token: str
