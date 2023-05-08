from datetime import datetime, date
import random


def random_date(date="2023-02-05"):
    pass


if __name__ == '__main__':
    for d in range(2, 8):
        for i in range(5):
            start_in = datetime(2023, 5, d, 7, 50, 0).timestamp()
            end_in = datetime(2023, 5, d, 8, 10, 0).timestamp()
            start_out = datetime(2023, 5, d, 16, 50, 0).timestamp()
            end_out = datetime(2023, 5, d, 18, 10, 0).timestamp()
            check_in = random.uniform(start_in, end_in)
            check_out = random.uniform(start_out, end_out)
            ds = date(2023, 5, d).strftime('%Y-%m-%d')
            print((i, ds, check_in, check_out), end=',\n')
