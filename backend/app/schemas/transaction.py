from pydantic import BaseModel


class TransactionAnnotateSchema(BaseModel):
    user_description: str


class TransactionSchema(BaseModel):
    id: int | None = None
    money_amount: float
    type: str
    category: str
    payment_type: str
    day: str = ""
    start_date: str
    finish_date: str | None = None
