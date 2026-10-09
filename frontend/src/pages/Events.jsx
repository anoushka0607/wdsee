function Events() {
  const events = [
    {
      name: 'Annual Sports Meet',
      date: 'November 15, 2026',
      venue: 'Main Ground',
      status: 'Upcoming',
    },
    {
      name: 'Badminton Tournament',
      date: 'November 22, 2026',
      venue: 'Indoor Court',
      status: 'Upcoming',
    },
    {
      name: 'Swimming Championship',
      date: 'December 5, 2026',
      venue: 'Swimming Pool',
      status: 'Upcoming',
    },
    {
      name: 'Basketball Friendly Match',
      date: 'December 12, 2026',
      venue: 'Basketball Court',
      status: 'Upcoming',
    },
  ]

  return (
    <section className="panel" style={{ marginTop: '28px' }}>
      <div className="panel-heading">
        <div>
          <h2>Club Events</h2>
          <p>Explore upcoming sports club events and tournaments.</p>
        </div>
        <span className="small-badge">{events.length} Events</span>
      </div>

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
              <th style={{ padding: '14px 8px' }}>Event Name</th>
              <th style={{ padding: '14px 8px' }}>Date</th>
              <th style={{ padding: '14px 8px' }}>Venue</th>
              <th style={{ padding: '14px 8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.name}>
                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {event.name}
                </td>
                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {event.date}
                </td>
                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {event.venue}
                </td>
                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {event.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Events