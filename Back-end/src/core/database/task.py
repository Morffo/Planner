from .initial import curs, conn
from models.TaskScheme import TaskScheme

curs.execute("""create table if not exists task(
                title text primary key
                )""")

def row_to_model(row: tuple) -> TaskScheme:
    return TaskScheme(title=row[0])

def model_to_dict(task: TaskScheme) -> dict:
    return task.dict()

def get_one(title:str) -> TaskScheme:
    qry = """select * from task where title=:title"""
    params = {"title": title}
    curs.execute(qry, params)
    row = curs.fetchone()
    return row_to_model(row)

def get_all() -> list[TaskScheme]:
    qry = """select * from task"""
    curs.execute(qry)
    rows = list(curs.fetchall())
    return [row_to_model(row) for row in rows]

def create_task(task:TaskScheme) -> TaskScheme:
    qry = """insert into task values (:title)"""
    params = {"title": task.title}
    curs.execute(qry, params)
    conn.commit()
    return task