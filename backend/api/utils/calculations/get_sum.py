from datetime import datetime, timedelta
from typing import Sequence

from pydantic import BaseModel

from api.utils.calculations.get_money import get_money
from db.models.transaction import Transaction


class SumModel(BaseModel):
    waste: float = 0
    income: float = 0
    sum: float = 0


def get_sum(transactions: Sequence[Transaction]) -> SumModel:
    sum = SumModel()
    for transaction in transactions:
        start = datetime.strptime(transaction.start_date, "%d:%m:%Y").date()
        finish = datetime.utcnow().date()
        if transaction.finish_date:
            finish = datetime.strptime(transaction.finish_date, "%d:%m:%Y").date()

        date = start
        transaction_sum = SumModel()
        transaction_money = get_money(transaction.type, transaction.money_amount)

        if transaction.payment_type == "once":
            transaction_sum.sum += transaction_money
            transaction_sum.waste += min(0.0, transaction_money)
            transaction_sum.income += max(0.0, transaction_money)
        else:
            while date <= finish:
                if transaction.payment_type == "annual":
                    day = int(transaction.day.split(":")[0])
                    month = int(transaction.day.split(":")[1])

                    if day == date.day and month == date.month:
                        transaction_sum.sum += transaction_money
                        transaction_sum.waste += min(0.0, transaction_money)
                        transaction_sum.income += max(0.0, transaction_money)

                elif transaction.payment_type == "monthly":
                    day = int(transaction.day)

                    if day == date.day:
                        transaction_sum.sum += transaction_money
                        transaction_sum.waste += min(0.0, transaction_money)
                        transaction_sum.income += max(0.0, transaction_money)

                elif transaction.payment_type == "weekly":
                    week_days = list(map(int, transaction.day.split(",")))

                    if date.weekday() in week_days:
                        transaction_sum.sum += transaction_money
                        transaction_sum.waste += min(0.0, transaction_money)
                        transaction_sum.income += max(0.0, transaction_money)

                date += timedelta(days=1)

        sum.sum += transaction_sum.sum
        sum.waste += transaction_sum.waste
        sum.income += transaction_sum.income

    return sum
