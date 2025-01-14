from sqlalchemy import Column, String, Float, DateTime, Enum, func, ARRAY
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()

class JobStatus(str, enum.Enum):
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class Job(Base):
    __tablename__ = "jobs"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    budget = Column(Float, nullable=False)
    skills = Column(ARRAY(String), nullable=False)
    experience = Column(String, nullable=False)
    user_id = Column(String, nullable=False)
    status = Column(Enum(JobStatus), default=JobStatus.OPEN)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())