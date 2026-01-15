from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import verify_password, create_access_token
from sqlalchemy import or_

def login_user(db: Session, email_username: str, password: str):
    user = db.query(User).filter(or_(User.email == email_username, User.username == email_username)).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    token = create_access_token({
        "sub": str(user.id),
        "email": user.email,
        "username": user.username,
        "role": user.role
    })

    return token