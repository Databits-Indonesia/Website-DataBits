FASTAPI BACKEND

1. INSTALL DEPENDENCIES

(Optional but recommended)
Create virtual environment:
`python -m venv venv`

Activate virtual environment:

Windows:
`venv\Scripts\activate`

Mac / Linux:
`source venv/bin/activate`

Install all modules from requirements.txt:
`pip install -r requirements.txt`


2. RUN FASTAPI

Start the FastAPI server:
`uvicorn main:app --reload`

Explanation:
- main = main.py file
- app = FastAPI instance
- --reload = auto reload on code changes

If successful, the server will run at:
`http://127.0.0.1:8000`

note: See database settings in `alembic/README.md`

4. ACCESS APPLICATION

Open in browser:
`http://127.0.0.1:8000`


5. API DOCUMENTATION

Swagger UI (for testing endpoints):
`http://127.0.0.1:8000/docs`

Use this to:
- Try endpoints
- View request and response

ReDoc (for reading documentation):
`http://127.0.0.1:8000/redoc`

Use this as:
- API reference
- Frontend (Next.js)


6. NOTES

- Make sure port 8000 is not used by another application
- If frontend runs on a different port, configure CORS properly
- Use ReDoc as the main API reference for frontend