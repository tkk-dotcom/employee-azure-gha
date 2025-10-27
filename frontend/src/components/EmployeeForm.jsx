import React, { useState } from 'react'
import axios from 'axios'

const API = '/api/employees'

export default function EmployeeForm() {
  const [empName, setEmpName] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!empName.trim()) return
    setSaving(true); setMsg('')
    try {
      await axios.post(API, { empName })
      setEmpName(''); setMsg('Saved')
      setTimeout(()=>setMsg(''), 1200)
    } catch (e) {
      console.error(e); setMsg('Error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} style={{display:'flex',gap:8,marginTop:16}}>
      <input value={empName} onChange={e=>setEmpName(e.target.value)} placeholder="Employee name"
             style={{flex:1,padding:8,border:'1px solid #ccc',borderRadius:8}}/>
      <button disabled={saving} style={{padding:'8px 16px',borderRadius:8}}>
        {saving?'Saving...':'Add Employee'}
      </button>
      {msg && <span>{msg}</span>}
    </form>
  )
}
