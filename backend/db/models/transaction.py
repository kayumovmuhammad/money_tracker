from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from db.db import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    type: Mapped[str]
    money_amount: Mapped[float]
    category: Mapped[str]
    payment_type: Mapped[str]
    day: Mapped[str]
    start_date: Mapped[str]
    finish_date: Mapped[str | None] = mapped_column(nullable=True)
