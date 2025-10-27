import React from 'react'
import EmployeeForm from './components/EmployeeForm.jsx'
import EmployeeList from './components/EmployeeList.jsx'

export default function App() {
  return (
    <div style={{padding: '2rem', maxWidth: 640, margin: '0 auto', fontFamily: 'sans-serif'}}>
      <h1 style={{fontSize: '1.8rem'}}>Employee Management</h1>
      <p style={{opacity: 0.8}}>Add an employee and view the list.</p>
      <EmployeeForm />
      <EmployeeList />
    </div>
  )
}
