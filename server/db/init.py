import sqlite3
import datetime
import os

if not os.path.exists('database.db'):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    with open('init.sql', 'r', encoding='utf-8') as f:
        script = f.read()
    cursor.executescript(script)
else:
    conn = sqlite3.connect('database.db')


for n, d, in_, out_ in conn.execute('SELECT * FROM timesheet LIMIT 10'):
    txt = f"""{n} check-in at {d+' '+datetime.datetime.fromtimestamp(in_).strftime('%H:%M:%S')}
{' '*len(str(n))} check-out at {d+' '+datetime.datetime.fromtimestamp(out_).strftime('%H:%M:%S') if out_ else 'None'}
"""
    print(txt)
