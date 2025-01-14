from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import engine, get_db
from .security import get_current_user
import uuid

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/jobs", response_model=schemas.Job)
async def create_job(
    job: schemas.JobCreate,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    job_dict = job.model_dump()
    job_dict["id"] = str(uuid.uuid4())
    job_dict["user_id"] = current_user
    return crud.create_job(db, job_dict)

@app.get("/jobs", response_model=list[schemas.Job])
async def list_jobs(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    return crud.get_jobs(db)

@app.get("/jobs/{job_id}", response_model=schemas.Job)
async def get_job(
    job_id: str,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    job = crud.get_job(db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job