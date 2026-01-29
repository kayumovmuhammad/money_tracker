import datetime
import json

from google import genai

from app.config import get_settings


def ask_gemini(question: str) -> str:
    settings = next(get_settings())

    client = genai.Client(api_key=settings.GEMINI_API_KEY)

    response = client.models.generate_content(
        model="gemini-3-flash-preview", contents=question
    )
    return str(response.text)


def annotate_type_of_transaction(user_description: str):
    now = str(datetime.datetime.utcnow())

    prompt = (
        """
        Hi, imaging that you work in application that tracking the user's
        money income or waste.

        Here is the JSON annotation that you should return to me:
            "
                {
                    "message": "ok" | "error description",
                    "type": "waste" | "income",
                    "money_amount": Number,
                    "category": "string", # You should write the category name in user's language and only one or two words with like "Food" | "Sport" | "Study" and so on, but use the user's language
                    "payment_type": "once" | "monthly" | "annual" | "weekly" | "daily",
                    "day": "date_for_once as string("YYYY-MM-DD")" | "day_of_month as string("DD")" | "date_of_year as string("MM-DD")" | "days of week as number from (e.g. 0 is monday | 1 is tuesday  | 2 is wednesday or other)" | "for daily you have to paste null",
                    "start_date": "YYYY-MM-DD", # if user doesn't mention the start date, you should paste here current date
                    "finish_date": "YYYY-MM-DD", # if user doesn't mention the finish date, you may not to add this column
                }
            "

        You should return only the JSON object, nothing more.
        Also don't user code formatting just give me correct json!

        This is the user transaction description: "
    """
        + user_description
        + """"
            current time and date:
        """
        + now
    )

    answer = ask_gemini(prompt)
    # answer = """{"message": "ok", "type": "waste", "money_amount": 50, "category": "Study", "payment_type": "weekly", "day": "0,4", "start_date": "17:01:2026"}"""

    answer_json = json.loads(answer)

    return answer_json
