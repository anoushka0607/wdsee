import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

function Sports() {
  const [sports, setSports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [type, setType] = useState('Team sport')
  const [icon, setIcon] = useState('🏆')

  useEffect(() => {
    async function fetchSports() {
      const { data, error } = await supabase
        .from('sports')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setSports(data ?? [])
      }

      setLoading(false)
    }

    fetchSports()
  }, [])

  async function addSport(event) {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return

    setError('')

    const { data, error } = await supabase
      .from('sports')
      .insert([{
        name: trimmedName,
        type,
        icon,
        color: 'blue',
      }])
      .select()
      .single()

    if (error) {
      setError(error.message)
      return
    }

    setSports((current) => [...current, data])
    setName('')
    setType('Team sport')
    setIcon('🏆')
    setShowForm(false)
  }

  async function removeSport(id) {
    setError('')

    const { error } = await supabase
      .from('sports')
      .delete()
      .eq('id', id)

    if (error) {
      setError(error.message)
      return
    }

    setSports((current) =>
      current.filter((sport) => sport.id !== id)
    )
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
          <h2>Sports Activities</h2>
          <p>Explore the sports offered by your club.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="small-badge">{sports.length} Sports</span>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '10px 14px',
              border: 'none',
              borderRadius: '8px',
              background: '#2563eb',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            {showForm ? 'Cancel' : '+ Add Sport'}
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" style={{ color: '#b91c1c', padding: '12px 0' }}>
          Error: {error}
        </p>
      )}

      {showForm && (
        <form
          onSubmit={addSport}
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
            placeholder="Sport name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            style={{ padding: '10px', flex: '1 1 180px' }}
          />

          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            style={{ padding: '10px', flex: '1 1 150px' }}
          >
            <option>Team sport</option>
            <option>Racquet sport</option>
            <option>Water sport</option>
            <option>Individual sport</option>
            <option>Outdoor sport</option>
          </select>

          <select
            value={icon}
            onChange={(event) => setIcon(event.target.value)}
            style={{ padding: '10px', flex: '0 1 110px' }}
          >
            <option value="🏆">🏆 Trophy</option>
            <option value="⚽">⚽ Football</option>
            <option value="🏸">🏸 Badminton</option>
            <option value="🏀">🏀 Basketball</option>
            <option value="🏊">🏊 Swimming</option>
            <option value="🏏">🏏 Cricket</option>
            <option value="🎾">🎾 Tennis</option>
            <option value="🏐">🏐 Volleyball</option>
          </select>

          <button
            type="submit"
            style={{
              padding: '10px 14px',
              border: 'none',
              borderRadius: '8px',
              background: '#16a34a',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Save Sport
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading sports...</p>
      ) : (
        <>
          <div className="stats-grid">
            {sports.map((sport) => (
              <article className="stat-card" key={sport.id}>
                <span className={`stat-icon ${sport.color}`}>
                  {sport.icon}
                </span>
                <h2>{sport.name}</h2>
                <p>{sport.type}</p>
                <button
                  type="button"
                  onClick={() => removeSport(sport.id)}
                  style={{
                    marginTop: '12px',
                    padding: '7px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    background: '#fee2e2',
                    color: '#b91c1c',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>

          {sports.length === 0 && (
            <p style={{ padding: '20px', textAlign: 'center' }}>
              No sports added yet. Click Add Sport to get started.
            </p>
          )}
        </>
      )}
    </section>
  )
}

export default Sports