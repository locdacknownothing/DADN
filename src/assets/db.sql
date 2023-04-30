CREATE TABLE USER (id, name, email, password, role);
-- role: 0 -> emp, 1: manager
-- 3 emp, 1 manager
CREATE TABLE TIMESHEET (id, user_id, date, check_in, check_out);
-- date: 30/04/2023

-- log in: input: email,password; output: id, name, email, role => USER
-- timesheet: input: user.id; output: date, check_in, check_out => TIMESHEET
-- manager emplist: input: ; output: all user role=0 (id, name, role, check_in, check_out) => JOIN 