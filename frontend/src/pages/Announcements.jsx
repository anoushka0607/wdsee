function Announcements() {
  const announcements = [
    {
      title: 'Annual Sports Meet Registration',
      date: 'October 10, 2026',
      message:
        'Registration is open for the upcoming Annual Sports Meet. Contact the club administrator to participate.',
      type: 'Event',
    },
    {
      title: 'Training Schedule Update',
      date: 'October 12, 2026',
      message:
        'Members are requested to check the training schedule for their respective sports before attending sessions.',
      type: 'Training',
    },
    {
      title: 'Membership Renewal',
      date: 'October 15, 2026',
      message:
        'Members are reminded to complete their membership renewal and update their contact details.',
      type: 'General',
    },
  ]

  return (
    <section className="panel" style={{ marginTop: '28px' }}>
      <div className="panel-heading">
        <div>
          <h2>Club Announcements</h2>
          <p>Stay updated with the latest news from your sports club.</p>
        </div>
        <span className="small-badge">
          {announcements.length} Announcements
        </span>
      </div>

      <div style={{ display: 'grid', gap: '18px' }}>
        {announcements.map((announcement) => (
          <article
            key={announcement.title}
            style={{
              padding: '18px',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <h3 style={{ margin: 0 }}>{announcement.title}</h3>
              <span className="small-badge">{announcement.type}</span>
            </div>

            <p style={{ color: '#64748b', fontSize: '13px' }}>
              {announcement.date}
            </p>

            <p>{announcement.message}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Announcements