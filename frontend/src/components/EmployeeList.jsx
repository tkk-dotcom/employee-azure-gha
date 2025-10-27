import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || process.env.REACT_APP_API_BASE || ''

export default function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/employees`)
      setEmployees(res.data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  if (loading) return <p>Loading...</p>
  if (!employees.length) return <p>No employees yet.</p>

  return (
    <ul style={{marginTop: '1rem', paddingLeft: '1rem'}}>
      {employees.map(emp => (
        <li key={emp.empId}>{emp.empName}</li>
      ))}
    </ul>
  )
}
