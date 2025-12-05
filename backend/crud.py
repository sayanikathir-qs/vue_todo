from sqlmodel import Session, select
from models import Todo

def create_todo(session: Session, todo: Todo):
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

def get_todos(session: Session):
    return session.exec(select(Todo)).all()

def get_todo(session: Session, todo_id: str):
    return session.get(Todo, todo_id)

def update_todo(session: Session, todo_id: str, data: dict):
    todo = session.get(Todo, todo_id)
    if not todo:
        return None

    for key, value in data.items():
        setattr(todo, key, value)

    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

def delete_todo(session: Session, todo_id: str):
    todo = session.get(Todo, todo_id)
    if not todo:
        return None

    session.delete(todo)
    session.commit()
    return True
