import sqlite3
from datetime import date, datetime
from flask import Flask, request, abort
from flask_restful import Resource, Api
from encode_face import encoded_faces

app = Flask(__name__)
api = Api(app)
conn = sqlite3.connect("db/database.db", check_same_thread=False)


class EncodeFace(Resource):
    def get(self, employee_id=None):
        if employee_id:
            if employee_id < encoded_faces.shape[0]:
                return encoded_faces[employee_id].tolist()
            else:
                abort(404, "Employee not found!")
        else:
            return encoded_faces.tolist()


class Login(Resource):
    def post(self):
        email, password = request.get_json(True).values()
        q = f"SELECT id FROM account WHERE account.email == '{email}' AND account.password == '{password}'"
        emp_id = next(conn.execute(q), None)
        if emp_id is not None:
            i, name, role = next(conn.execute(
                f"SELECT id, name, role FROM user WHERE user.id == {emp_id[0]}"))
            return {'id': i, 'name': name, 'role': role}
        else:
            return None


class EmployeeAttendanceChecking(Resource):

    def get(self, employee_id=None):
        data = []
        if employee_id is None:
            q = """SELECT user.id, user.name, timesheet.check_in, timesheet.check_out
FROM timesheet
INNER JOIN user ON timesheet.id == user.id
WHERE user.role == 0
"""
            for i, n, ci, co in conn.execute(q):
                data.append(
                    {'id': i, 'name': n, 'check_in': ci, 'check_out': co})
        elif employee_id == 'all':
            for i, ci, co in conn.execute("SELECT id, check_in, check_out from timesheet"):
                data.append({'id': i, 'check_in': ci, 'check_out': co})
        else:
            for d, ci, co in conn.execute(f"SELECT _date, check_in, check_out FROM timesheet WHERE timesheet.id == '{employee_id}'"):
                data.append({'date': d, 'check_in': ci, 'check_out': co})
            if not data:
                abort(404, "Employee not found!")

        return data

    def post(self):
        day = str(date.today())
        current = datetime.now().timestamp()
        emp_id = request.form['id']
        txt = f"SELECT * FROM timesheet WHERE timesheet._date == '{day}' AND timesheet.id == {emp_id}"
        if next(conn.execute(txt), None) is None:
            q = f"INSERT INTO timesheet VALUES ({emp_id},'{day}', {current}, NULL)"
        else:
            q = f"UPDATE timesheet SET check_out = {current} WHERE timesheet._date == '{day}' AND timesheet.id == {emp_id}"

        conn.execute(q)
        conn.commit()
        return True


api.add_resource(EmployeeAttendanceChecking,
                 "/attcheck/", "/attcheck/<employee_id>")
api.add_resource(Login, "/login/")
api.add_resource(EncodeFace, "/encode/")

app.run(host='0.0.0.0', port=5000)
