from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from api.utils.calculations.get_sum import get_sum
from api.utils.security import get_current_user
from db.get_db import get_db
from db.models.transaction import Transaction
from db.models.user import User

router = APIRouter(prefix="/calculate", tags=["Calculations"])


@router.get("/summary")
async def get_summary(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    stmt = select(Transaction).where(Transaction.user_id == user.id)
    transactions = db.scalars(stmt).all()
    
    # print(len(transactions))

    return get_sum(transactions=transactions)
