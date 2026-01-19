def get_money(type: str, sum: float) -> float:
    if type == "waste":
        return -sum
    return sum
