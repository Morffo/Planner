import os

from pathlib import Path
from sqlite3 import connect, Connection, Cursor, IntegrityError

conn = connect("planner.db")
curs = conn.cursor()


