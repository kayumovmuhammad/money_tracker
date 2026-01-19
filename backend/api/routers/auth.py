from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from firebase_admin import auth
from sqlalchemy.orm import Session

from api.schemas.auth import LoginSchema
from db.get_db import get_db
from db.models.user import User

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
async def login(data: LoginSchema, db: Session = Depends(get_db)):
    try:
        decoded_token = auth.verify_id_token(data.token)
        firebase_id = decoded_token["uid"]
        email = decoded_token.get("email")
        name = decoded_token.get("name")
        photo_url = decoded_token.get("picture")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid Token: {e}",
        )

    user = db.query(User).filter(User.firebase_id == firebase_id).first()

    if user:
        user.name = name
        user.email = email
        user.photo_url = photo_url
        message = "User updated"
    else:
        user = User(
            firebase_id=firebase_id,
            name=name,
            email=email,
            photo_url=photo_url,
        )
        db.add(user)
        message = "User created"

    db.commit()
    db.refresh(user)

    return JSONResponse(
        content={"message": message}, headers={"user": str(user.firebase_id)}
    )
