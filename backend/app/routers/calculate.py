from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.schemas.calculate import CalculateSchema
from app.utils.calculations.get_sum import get_sum
from app.utils.security import get_current_user
from db.get_db import get_db
from db.models.transaction import Transaction
from db.models.user import User

router = APIRouter(prefix="/calculate", tags=["Calculations"])


@router.post("/summary")
async def get_summary(
    data: CalculateSchema,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    stmt = select(Transaction).where(Transaction.user_id == user.id)
    transactions = db.scalars(stmt).all()

    return get_sum(transactions=transactions, frm=data.frm, to=data.to)
