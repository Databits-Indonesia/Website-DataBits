from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.publication import Publication
from app.schemas.publication import PublicationCreate, PublicationUpdate
from app.services.activity import log_activity

def create_publication(db: Session, data: PublicationCreate, user_id: int):
    publication = Publication(
        title=data.title,
        writer=data.writer,
        journal=data.journal,
        desc=data.desc,
        link=data.link,
        publication_date=data.publication_date,
    )

    db.add(publication)
    db.commit()
    db.refresh(publication)

    log_activity(
        db=db,
        user_id=user_id,
        module="publication",
        action="create",
        object_id=publication.id,
        description=f"Publikasi baru ditambahkan: {publication.title}"
    )
    return publication


def get_publications(db: Session):
    return db.query(Publication).all()


def get_publication_by_id(db: Session, publication_id: int):
    return db.query(Publication).filter(Publication.id == publication_id).first()


def update_publication(db: Session, publication_id: int, data: PublicationUpdate, user_id: int):
    publication = get_publication_by_id(db, publication_id)

    if not publication:
        raise HTTPException(status_code=404, detail="Publication not found")

    if data.title:
        publication.title = data.title

    if data.writer:
        publication.writer = data.writer

    if data.journal:
        publication.journal = data.journal

    if data.desc:
        publication.desc = data.desc

    if data.link:
        publication.link = data.link

    if data.publication_date:
        publication.publication_date = data.publication_date

    db.commit()
    db.refresh(publication)

    log_activity(
        db=db,
        user_id=user_id,
        module="publication",
        action="update",
        object_id=publication.id,
        description=f"Edit data publikasi: {publication.title}"
    )
    return publication

def delete_publication(db: Session, publication_id: int, user_id: int):
    publication = get_publication_by_id(db, publication_id)
    if not publication:
        raise HTTPException(status_code=404, detail="Publication not found")
    db.delete(publication)
    db.commit()

    log_activity(
        db=db,
        user_id=user_id,
        module="publication",
        action="delete",
        object_id=publication.id,
        description=f"Hapus publikasi: {publication.title}"
    )

def count_publications(db: Session):
    return db.query(Publication).count()