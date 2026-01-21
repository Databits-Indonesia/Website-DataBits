from fastapi import FastAPI
from app.api.v1.admin import (
    about, activity,
    auth, blog,
    career, category,
    contact, home,
    message, product,
    project, publication,
    research, 
    sup_career, user
)
from app.api.v1.public import (
    about_public, blog_public, 
    career_public, category_public, 
    contact_public, home_public, 
    message_public, product_public,
    project_public, publication_public,
    research_public, sup_career_public
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    app.mount(
        "/static",
        StaticFiles(directory=os.path.join(BASE_DIR, "app", "uploads")),
        name="static"
    )
except:
    pass

routers_admin = [
    about, activity,
    auth, blog,
    career, category,
    contact, home,
    message, product,
    project, publication,
    research,
    sup_career, user
]

routers_public = [
    about_public, blog_public, 
    career_public, category_public, 
    contact_public, home_public, 
    message_public, product_public,
    project_public, publication_public,
    research_public, sup_career_public
]

for rtr in routers_admin + routers_public:
    app.include_router(rtr.router)