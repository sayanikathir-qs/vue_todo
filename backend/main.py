from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
from database import init_db, get_session
from models import Todo, TodoRead, TodoCreate, TodoUpdate
import crud

api = FastAPI()

# Allow Vue frontend
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@api.on_event("startup")
def on_startup():
    init_db()


# ----------------------
# LIST TODOS
# ----------------------
@api.get("/todos", response_model=list[TodoRead])
def list_todos(session: Session = Depends(get_session)):
    return crud.get_todos(session)


# ----------------------
# CREATE TODO
# ----------------------
@api.post("/todos", response_model=TodoRead)
def create_new(todo: TodoCreate, session: Session = Depends(get_session)):
    return crud.create_todo(session, todo)


# ----------------------
# GET ONE TODO
# ----------------------
@api.get("/todos/{todo_id}", response_model=TodoRead)
def get_one(todo_id: int, session: Session = Depends(get_session)):
    todo = crud.get_todo(session, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


# ----------------------
# UPDATE TODO
# ----------------------
@api.put("/todos/{todo_id}", response_model=TodoRead)
def update(todo_id: int, data: TodoUpdate, session: Session = Depends(get_session)):
    updated = crud.update_todo(session, todo_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated


# ----------------------
# DELETE TODO
# ----------------------
@api.delete("/todos/{todo_id}")
def delete(todo_id: int, session: Session = Depends(get_session)):
    deleted = crud.delete_todo(session, todo_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"message": "Deleted"}
