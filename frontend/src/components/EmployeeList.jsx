import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API = '/api/employees'

export default function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await axios.get(API)
      setEmployees(res.data || [])
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ load() }, [])

  if (loading) return <p>Loading...</p>
  if (!employees.length) return <p>No employees yet.</p>
  return (
    <ul style={{marginTop:16}}>
      {employees.map(e => <li key={e.empId}>{e.empName}</li>)}
    </ul>
  )
}
