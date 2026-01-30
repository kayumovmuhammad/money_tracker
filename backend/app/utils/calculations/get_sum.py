from collections import defaultdict
from datetime import datetime, timedelta
from typing import Sequence

from pydantic import BaseModel

from app.utils.calculations.get_money import get_money
from db.models.transaction import Transaction


class SumModel(BaseModel):
    waste: float = 0
    income: float = 0
    sum: float = 0
    sum_by_category: dict[str, float] = {}
    income_by_category: dict[str, float] = {}
    waste_by_category: dict[str, float] = {}
    income_by_days: dict[str, float] = {}
    waste_by_days: dict[str, float] = {}


def get_sum(
    transactions: Sequence[Transaction], frm: str = "", to: str = ""
) -> SumModel:
    sum = SumModel()
    for transaction in transactions:
        start = datetime.strptime(transaction.start_date, "%Y-%m-%d").date()
        if frm == "":
            frm = str(start)
        q_start = datetime.strptime(frm, "%Y-%m-%d").date()
        start = max(start, q_start)

        def add_to_sum(day: str):
            transaction_sum.sum += transaction_money
            transaction_sum.waste += min(0.0, transaction_money)
            transaction_sum.income += max(0.0, transaction_money)
            sum.sum_by_category[transaction.category] = (
                sum.sum_by_category.get(transaction.category, 0) + transaction_money
            )
            sum.waste_by_category[transaction.category] = sum.waste_by_category.get(
                transaction.category, 0
            ) + min(0.0, transaction_money)
            sum.income_by_category[transaction.category] = sum.income_by_category.get(
                transaction.category, 0
            ) + max(0.0, transaction_money)
            sum.waste_by_days[day] = sum.waste_by_days.get(day, 0) + min(
                0.0, transaction_money
            )
            sum.income_by_days[day] = sum.income_by_days.get(day, 0) + max(
                0.0, transaction_money
            )

        finish = datetime.utcnow().date()
        if transaction.finish_date:
            finish = datetime.strptime(transaction.finish_date, "%Y-%m-%d").date()
        if to == "":
            to = str(finish)
        q_finish = datetime.strptime(to, "%Y-%m-%d").date()
        finish = min(finish, q_finish)

        date = start
        transaction_sum = SumModel()
        transaction_money = get_money(transaction.type, transaction.money_amount)

        if transaction.payment_type == "once":
            day = datetime.strptime(transaction.day, "%Y-%m-%d").date()
            if q_start <= day <= q_finish:
                add_to_sum(str(day))
        else:
            while date <= finish:
                if transaction.payment_type == "annual":
                    day = int(transaction.day.split("-")[1])
                    month = int(transaction.day.split("-")[0])

                    if day == date.day and month == date.month:
                        add_to_sum(str(date))

                elif transaction.payment_type == "monthly":
                    day = int(transaction.day)

                    if day == date.day:
                        add_to_sum(str(date))

                elif transaction.payment_type == "weekly":
                    week_day = int(transaction.day)

                    if date.weekday() == week_day:
                        add_to_sum(str(date))

                elif transaction.payment_type == "daily":
                    add_to_sum(str(date))

                date += timedelta(days=1)

        sum.sum += transaction_sum.sum
        sum.waste += -transaction_sum.waste
        sum.income += transaction_sum.income

    for key in list(sum.sum_by_category.keys()):
        if sum.sum_by_category[key] == 0:
            del sum.sum_by_category[key]

    for key in list(sum.income_by_category.keys()):
        if sum.income_by_category[key] == 0:
            del sum.income_by_category[key]

    for key in list(sum.waste_by_category.keys()):
        if sum.waste_by_category[key] == 0:
            del sum.waste_by_category[key]

    return sum
