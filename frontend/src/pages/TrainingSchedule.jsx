function TrainingSchedule() {
  const sessions = [
    {
      sport: 'Football',
      coach: 'Coach Rahul',
      time: 'Monday, 5:00 PM – 6:30 PM',
      venue: 'Main Ground',
    },
    {
      sport: 'Badminton',
      coach: 'Coach Priya',
      time: 'Tuesday, 4:00 PM – 5:00 PM',
      venue: 'Indoor Court',
    },
    {
      sport: 'Basketball',
      coach: 'Coach Arjun',
      time: 'Wednesday, 5:00 PM – 6:00 PM',
      venue: 'Basketball Court',
    },
    {
      sport: 'Swimming',
      coach: 'Coach Sneha',
      time: 'Friday, 4:30 PM – 5:30 PM',
      venue: 'Swimming Pool',
    },
  ]

  return (
    <section className="panel" style={{ marginTop: '28px' }}>
      <div className="panel-heading">
        <div>
          <h2>Training Schedule</h2>
          <p>View upcoming sports training sessions.</p>
        </div>
        <span className="small-badge">4 Sessions</span>
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
              <th style={{ padding: '14px 8px' }}>Sport</th>
              <th style={{ padding: '14px 8px' }}>Coach</th>
              <th style={{ padding: '14px 8px' }}>Time</th>
              <th style={{ padding: '14px 8px' }}>Venue</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.sport}>
                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {session.sport}
                </td>
                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {session.coach}
                </td>
                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {session.time}
                </td>
                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {session.venue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TrainingSchedule