import React, { useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || process.env.REACT_APP_API_BASE || ''

export default function EmployeeForm() {
  const [empName, setEmpName] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!empName.trim()) return
    setSaving(true)
    setMessage('')
    try {
      await axios.post(`${API_BASE}/api/employees`, { empName })
      setEmpName('')
      setMessage('Saved!')
      setTimeout(()=> setMessage(''), 1200)
    } catch (err) {
      console.error(err)
      setMessage('Error saving employee')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{marginTop: '1rem', marginBottom: '1rem', display: 'flex', gap: '0.5rem'}}>
      <input
        type="text"
        value={empName}
        onChange={(e)=> setEmpName(e.target.value)}
        placeholder="Employee name"
        style={{flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: 8}}
      />
      <button type="submit" disabled={saving} style={{padding: '0.5rem 1rem', borderRadius: 8}}>
        {saving ? 'Saving...' : 'Add Employee'}
      </button>
      {message && <span aria-live="polite" style={{marginLeft: 8}}>{message}</span>}
    </form>
  )
}
