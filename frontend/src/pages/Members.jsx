import { useEffect, useState } from 'react'

function Members() {
 const [members, setMembers] = useState(() => {
  const savedMembers = localStorage.getItem('sportsClubMembers')

  if (savedMembers !== null) {
    return JSON.parse(savedMembers)
  }

  return [
    { id: 1, name: 'Rahul Sharma', sport: 'Football', status: 'Active' },
    { id: 2, name: 'Priya Singh', sport: 'Badminton', status: 'Active' },
    { id: 3, name: 'Arjun Kumar', sport: 'Basketball', status: 'Pending' },
    { id: 4, name: 'Sneha Patel', sport: 'Swimming', status: 'Active' },
  ]
})

useEffect(() => {
  localStorage.setItem('sportsClubMembers', JSON.stringify(members))
}, [members])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [sport, setSport] = useState('Football')
  const [status, setStatus] = useState('Active')

  function addMember(event) {
    event.preventDefault()

    const newMember = {
      id: Date.now(),
      name: name.trim(),
      sport,
      status,
    }

    if (!newMember.name) return

    setMembers([...members, newMember])
    setName('')
    setSport('Football')
    setStatus('Active')
    setShowForm(false)
  }

  function removeMember(id) {
    setMembers(members.filter((member) => member.id !== id))
  }

  return (
    <section className="panel" style={{ marginTop: '28px' }}>
      <div
        className="panel-heading"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h2>Club Members</h2>
          <p>Manage and view your registered members.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '10px 16px',
            border: 'none',
            borderRadius: '8px',
            background: '#2563eb',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          {showForm ? 'Cancel' : '+ Add Member'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={addMember}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            margin: '20px 0',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '8px',
          }}
        >
          <input
            type="text"
            placeholder="Member name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            style={{ padding: '10px', flex: '1 1 180px' }}
          />

          <select
            value={sport}
            onChange={(event) => setSport(event.target.value)}
            style={{ padding: '10px', flex: '1 1 150px' }}
          >
            <option>Football</option>
            <option>Badminton</option>
            <option>Basketball</option>
            <option>Swimming</option>
          </select>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            style={{ padding: '10px', flex: '1 1 120px' }}
          >
            <option>Active</option>
            <option>Pending</option>
          </select>

          <button
            type="submit"
            style={{
              padding: '10px 16px',
              border: 'none',
              borderRadius: '8px',
              background: '#16a34a',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Save Member
          </button>
        </form>
      )}

      <p style={{ margin: '16px 0' }}>
        Total Members: <strong>{members.length}</strong>
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: '14px 8px' }}>Member Name</th>
              <th style={{ padding: '14px 8px' }}>Sport</th>
              <th style={{ padding: '14px 8px' }}>Status</th>
              <th style={{ padding: '14px 8px' }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {member.name}
                </td>

                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {member.sport}
                </td>

                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {member.status}
                </td>

                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    style={{
                      padding: '7px 10px',
                      border: 'none',
                      borderRadius: '6px',
                      background: '#fee2e2',
                      color: '#b91c1c',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {members.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '20px', textAlign: 'center' }}>
                  No members found. Click Add Member to register one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Members