import os
from typing import Generator

from load_dotenv import load_dotenv


class Settings:
    def __init__(self):
        load_dotenv()
        self.GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
        self.FIRST_PAGE: int = int(os.getenv("FIRST_PAGE", "0"))
        self.AMOUNT_IN_PAGE: int = int(os.getenv("AMOUNT_IN_PAGE", "0"))
        self.FIREBASE_CRED_PATH: str = os.getenv("FIREBASE_CRED_PATH", "")


def get_settings() -> Generator[Settings, None, None]:
    settings = Settings()
    try:
        yield settings
    except Exception as exeption:
        print(f"[ERR] => Error in Settings: {exeption}")
