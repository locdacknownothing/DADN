Server Usage:

1. Login:

   - Method: POST
   - URL: http://127.0.0.1:5000/login
   - Example input:
     ```json
     { "email": "loc@pasic.com", "password": "admin" }
     ```
   - Example output: `null` if wrong email or password else:

     ```json
     { "id": 0, "name": "Lê Tấn Lộc", "role": 1 }
     ```

2. Attendance Checking:

   - Method: GET
   - URL: http://127.0.0.1:5000/attcheck/\<employee-id>
   - Usage:

     - \<employee-id> is empty: return all employee that is not manager.

     ```json
     [
       {
         "id": 1,
         "name": "Huỳnh Đại Vinh",
         "check_in": 1682647597,
         "check_out": 1682680351
       },
       {
         "id": 2,
         "name": "Lalisa Manoban",
         "check_in": 1682647597,
         "check_out": 1682680351
       }
     ]
     ```

     - \<employee-id> is ID: return all attendance data of Employee

     ```json
     [
       {
         "date": "2023-28-04",
         "check_in": 1682643637,
         "check_out": 1682676876
       },
       {
         "date": "2023-05-01",
         "check_in": 1682903673,
         "check_out": 1682936301
       }
     ]
     ```
