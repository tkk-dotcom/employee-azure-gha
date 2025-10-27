import React from 'react'
import EmployeeForm from './components/EmployeeForm.jsx'
import EmployeeList from './components/EmployeeList.jsx'

export default function App() {
  return (
    <div style={{padding:'2rem',maxWidth:640,margin:'0 auto',fontFamily:'system-ui, sans-serif'}}>
      <h1>Employee Management</h1>
      <p>Add employees and view the list. Data stored in MySQL.</p>
      <EmployeeForm/>
      <EmployeeList/>
    </div>
  )
}
