import os
import json
from datetime import date, datetime

if not os.path.exists('timesheet.json'):
    timesheet = {str(date.today()): dict()}
else:
    with open('timesheet.json', 'r') as f:
        timesheet = json.load(f)


def check(id):
    day = str(date.today())
    if id not in timesheet[day].keys():
        timesheet[day][id] = dict()
        timesheet[day][id]['check-in'] = datetime.now().timestamp()
        print(f"Check-in: '{id}' at {datetime.now()}")
    else:
        current = datetime.now().timestamp()
        if current - timesheet[day][id]['check-in'] >= 300:  # 5 minutes
            timesheet[day][id]['check-out'] = datetime.now().timestamp()
            print(f"Check-out: '{id}' at {datetime.now()}")
        else:
            return

    with open('timesheet.json', 'w') as f:
        json.dump(timesheet, f)
