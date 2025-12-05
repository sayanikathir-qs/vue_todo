##sql model orm

from sqlmodel import SQLModel, Field
from datetime import datetime
import uuid

class Todo(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    title: str
    completed: bool = False
    isFavorite: bool = False
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
