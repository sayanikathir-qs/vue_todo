from sqlmodel import SQLModel, Field
from sqlalchemy import Column, Integer
from typing import Optional
from datetime import date


# --------------------------
# ORM MODEL (Database Table)
# --------------------------
class Todo(SQLModel, table=True):
    id: Optional[int] = Field(
        default=None,
        sa_column=Column(Integer, primary_key=True, autoincrement=True)
    )
    title: str
    completed: bool = False
    isFavorite: bool = False
    createdAt: date = Field(default_factory=date.today)


# --------------------------
# CREATE Model (POST)
# --------------------------
class TodoCreate(SQLModel):
    title: str


# --------------------------
# READ Model (GET Responses)
# --------------------------
class TodoRead(SQLModel):
    id: int
    title: str
    completed: bool
    isFavorite: bool
    createdAt: date


# --------------------------
# UPDATE Model (PATCH/PUT)
# --------------------------
class TodoUpdate(SQLModel):
    title: Optional[str] = None
    completed: Optional[bool] = None
    isFavorite: Optional[bool] = None
