from sqlalchemy.orm import Session
from app.models.activity_log import ActivityLog
from typing import Optional

def log_activity(db: Session, user_id: Optional[int], module: str, action: str, 
                 object_id: Optional[int] = None, description: Optional[str] = None):
    log = ActivityLog(
        user_id=user_id,
        module=module,
        action=action,
        object_id=object_id,
        description=description
    )
    db.add(log)
    db.commit()
    # db.refresh(log)