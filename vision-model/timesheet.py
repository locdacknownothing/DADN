import config
import requests
from collections import defaultdict
from datetime import datetime

SERVER_URL = f'http://{config.SERVER_URL}:5000/attcheck/'

previous_check = defaultdict(int)
for data in requests.get(url=SERVER_URL+'all').json():
    t = previous_check[data['id']], data['check_in']
    if data['check_out']:
        t += (data['check_out'],)
    previous_check[data['id']] = max(t)


def check(emp_id):
    current = datetime.now().timestamp()
    if current - previous_check[emp_id] > 300:
        previous_check[emp_id] = current
        requests.post(url=SERVER_URL, data={'id': emp_id})
