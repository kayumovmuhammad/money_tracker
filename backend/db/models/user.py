from typing import Optional

from sqlalchemy.orm import Mapped, mapped_column

from db.db import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    firebase_id: Mapped[str] = mapped_column(unique=True)
    name: Mapped[Optional[str]]
    email: Mapped[Optional[str]]
    photo_url: Mapped[Optional[str]]
