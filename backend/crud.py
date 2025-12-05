from sqlmodel import Session, select
from models import Todo, TodoCreate, TodoUpdate


def create_todo(session: Session, todo_data: TodoCreate):
    todo = Todo(**todo_data.dict())
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


def get_todos(session: Session):
    return session.exec(select(Todo)).all()


def get_todo(session: Session, todo_id: int):
    return session.get(Todo, todo_id)


def update_todo(session: Session, todo_id: int, data: TodoUpdate):
    todo = session.get(Todo, todo_id)
    if not todo:
        return None

    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(todo, key, value)

    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


def delete_todo(session: Session, todo_id: int):
    todo = session.get(Todo, todo_id)
    if not todo:
        return None

    session.delete(todo)
    session.commit()
    return True
