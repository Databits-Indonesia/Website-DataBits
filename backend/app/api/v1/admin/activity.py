from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.activity_log import ActivityLog
from app.models.user import User
from app.schemas.activity import ActivityRead
from datetime import timedelta
import pytz

router = APIRouter(
    prefix="/activities", 
    tags=["Activities Logs"]
)

@router.get("", response_model=List[ActivityRead])
def list_activities(db: Session = Depends(get_db)):
    data = (
        db.query(ActivityLog, User.username)
        .outerjoin(User, User.id == ActivityLog.user_id)
        .order_by(ActivityLog.created_at.desc()).all()
    )
    return [
        {
            "id": activity.id,
            "user": username if username else "client",
            "module": activity.module,
            "action": activity.action,
            "object_id": activity.object_id,
            "description": activity.description,
            "created_at": activity.created_at.astimezone(pytz.timezone("Asia/Jakarta")) + timedelta(hours=7),
        }
        for activity, username in data
    ]