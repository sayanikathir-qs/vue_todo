##routes ,cors
from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session
from database import init_db, get_session
from models import Todo
import crud
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow Vue frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow Vue dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/todos")
def list_todos(session: Session = Depends(get_session)):
    return crud.get_todos(session)

@app.post("/todos")
def create_new(todo: Todo, session: Session = Depends(get_session)):
    return crud.create_todo(session, todo)

@app.get("/todos/{todo_id}")
def get_one(todo_id: str, session: Session = Depends(get_session)):
    todo = crud.get_todo(session, todo_id)
    if not todo:
        raise HTTPException(404, "Todo not found")
    return todo

@app.put("/todos/{todo_id}")
def update(todo_id: str, data: dict, session: Session = Depends(get_session)):
    updated = crud.update_todo(session, todo_id, data)
    if not updated:
        raise HTTPException(404, "Todo not found")
    return updated

@app.delete("/todos/{todo_id}")
def delete(todo_id: str, session: Session = Depends(get_session)):
    deleted = crud.delete_todo(session, todo_id)
    if not deleted:
        raise HTTPException(404, "Todo not found")
    return {"message": "Deleted"}
