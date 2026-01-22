from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from api.config import Settings, get_settings
from api.schemas.transaction import TransactionAnnotateSchema, TransactionSchema
from api.utils.gemini import annotate_type_of_transaction
from api.utils.security import get_current_user
from db.get_db import get_db
from db.models.transaction import Transaction
from db.models.user import User

router = APIRouter(prefix="/transaction", tags=["Transactions"])


@router.post("/annotate")
async def annotate_transaction(
    data: TransactionAnnotateSchema,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    ann_transaction: dict = annotate_type_of_transaction(data.user_description)

    print(user)

    if ann_transaction["message"] != "ok":
        raise HTTPException(status_code=404, detail=ann_transaction["message"])

    transaction = Transaction(
        type=ann_transaction["type"],
        money_amount=ann_transaction["money_amount"],
        category=ann_transaction["category"],
        payment_type=ann_transaction["payment_type"],
        day=ann_transaction["day"],
        start_date=ann_transaction["start_date"],
        finish_date=ann_transaction.get("finish_date"),
    )

    return {"message": "ok", "transaction": transaction}


@router.post("/create")
async def create_transaction(
    data: TransactionSchema,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    transaction = Transaction(
        user_id=user.id,
        type=data.type,
        money_amount=data.money_amount,
        category=data.category,
        payment_type=data.payment_type,
        day=data.day,
        start_date=data.start_date,
        finish_date=data.finish_date,
    )

    db.add(transaction)
    db.commit()
    db.refresh(transaction)

    return {"message": "ok", "transaction": transaction}


@router.get("/read/page/{page}")
async def read_transactions_partly(
    page: int,
    amount_in_page: int = next(get_settings()).AMOUNT_IN_PAGE,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    settings: Settings = next(get_settings())

    first_page = settings.FIRST_PAGE

    offset = amount_in_page * (page - first_page)
    stmt = (
        select(Transaction)
        .where(Transaction.user_id == user.id)
        .offset(offset)
        .limit(amount_in_page)
    )

    transactions = db.scalars(stmt).all()

    if page < first_page or not transactions:
        raise HTTPException(status_code=404, detail="This page doesn't exist")

    return {"message": "ok", "transactions": transactions}


@router.get("/read/all")
async def read_transactions(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    stmt = select(Transaction).where(Transaction.user_id == user.id)
    transactions = db.scalars(stmt).all()

    return {"message": "ok", "transactions": transactions}


@router.get("/read/{id}")
async def read_transaction(
    id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    stmt = select(Transaction).where(
        Transaction.id == id, Transaction.user_id == user.id
    )
    transaction = db.scalar(stmt)

    if not transaction:
        raise HTTPException(status_code=404, detail="This transaction doesn't exist")

    return {"message": "ok", "transaction": transaction}


@router.patch("/update")
async def update_transaction(
    data: TransactionSchema,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    stmt = select(Transaction).where(
        Transaction.id == data.id, Transaction.user_id == user.id
    )
    transaction = db.scalar(stmt)

    if not transaction:
        raise HTTPException(status_code=404, detail="This transaction doesn't exist")

    transaction.type = data.type
    transaction.money_amount = data.money_amount
    transaction.payment_type = data.payment_type
    transaction.category = data.category
    transaction.day = data.day
    transaction.start_date = data.start_date
    transaction.finish_date = data.finish_date

    db.commit()
    db.refresh(transaction)

    return {"message": "ok", "transaction": transaction}


@router.delete("/delete/{id}")
async def delete_transaction(
    id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    stmt = select(Transaction).where(
        Transaction.id == id, Transaction.user_id == user.id
    )
    transaction = db.scalar(stmt)

    if not transaction:
        raise HTTPException(status_code=404, detail="This transaction doesn't exist")

    db.delete(transaction)
    db.commit()

    return {"message": "ok"}
