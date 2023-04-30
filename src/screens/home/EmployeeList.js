import React from 'react'
import Background from '../../components/Background'
import Header from '../../components/Header'

export default function EmployeeList({navigation}) {
  const emps = [{"name": "loc", "email": "g@g.g"}];
  // const timesheet = "emp_id", "timestamp" "check_in", "check_out"
  return (
    <Background>
      <Header>Danh sách nhân viên</Header>
    </Background>
  )
}

// select * from user where role=0;