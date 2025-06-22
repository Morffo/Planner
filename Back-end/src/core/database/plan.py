from .initial import conn, curs
from models.PlanScheme import PlanScheme

from .task import row_to_model, model_to_dict

curs.execute("""create table if not exists plan(
             title text primary key,
             descrpiption text null,
             content text null)""")

def get_all() -> list[PlanScheme]:
    qry = curs.execute("""select * from plan""")
    rows = list(qry.fetchall())
    return [row_to_model(row) for row in rows]
