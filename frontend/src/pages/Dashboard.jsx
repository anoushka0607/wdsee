
function Dashboard() {
  return (
    <>
      <section className="welcome-banner">
        <div>
          <p className="banner-label">WELCOME BACK!</p>
          <h2>Your club, all in one place.</h2>
          <p>Manage members, training sessions, and events with ease.</p>
        </div>
        <div className="banner-icon">🏅</div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span className="stat-icon blue">👥</span>
          <p>Total Members</p>
          <h2>250</h2>
          <span className="stat-note">Registered club members</span>
        </article>

        <article className="stat-card">
          <span className="stat-icon green">⚽</span>
          <p>Sports Activities</p>
          <h2>08</h2>
          <span className="stat-note">Available sports</span>
        </article>

        <article className="stat-card">
          <span className="stat-icon orange">📅</span>
          <p>Training Sessions</p>
          <h2>12</h2>
          <span className="stat-note">Scheduled this week</span>
        </article>

        <article className="stat-card">
          <span className="stat-icon purple">🏆</span>
          <p>Upcoming Events</p>
          <h2>04</h2>
          <span className="stat-note">Events to look forward to</span>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>Upcoming Activities</h2>
              <p>Here's what's happening at your club.</p>
            </div>
            <span className="small-badge">This week</span>
          </div>

          <div className="activity-row">
            <div className="activity-date">
              <strong>10</strong>
              <span>OCT</span>
            </div>
            <div className="activity-info">
              <strong>Football Practice</strong>
              <p>Football Ground · 4:00 PM</p>
            </div>
            <span className="status blue-status">Training</span>
          </div>

          <div className="activity-row">
            <div className="activity-date">
              <strong>12</strong>
              <span>OCT</span>
            </div>
            <div className="activity-info">
              <strong>Badminton Session</strong>
              <p>Indoor Court · 10:00 AM</p>
            </div>
            <span className="status green-status">Practice</span>
          </div>

          <div className="activity-row">
            <div className="activity-date">
              <strong>15</strong>
              <span>OCT</span>
            </div>
            <div className="activity-info">
              <strong>Club Tournament</strong>
              <p>Main Sports Arena · 9:00 AM</p>
            </div>
            <span className="status orange-status">Event</span>
          </div>
        </article>

        <article className="panel announcement-panel">
          <div className="panel-heading">
            <div>
              <h2>Club Announcements</h2>
              <p>Important updates for members.</p>
            </div>
            <span className="announcement-icon">📢</span>
          </div>

          <div className="announcement-item">
            <span className="announcement-dot" />
            <div>
              <strong>Registration is open</strong>
              <p>Sign up for the upcoming club tournament.</p>
            </div>
          </div>

          <div className="announcement-item">
            <span className="announcement-dot green-dot" />
            <div>
              <strong>Training schedule updated</strong>
              <p>Check the latest practice timings.</p>
            </div>
          </div>

          <div className="announcement-item">
            <span className="announcement-dot orange-dot" />
            <div>
              <strong>Member meeting</strong>
              <p>Stay tuned for the meeting details.</p>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}

export default Dashboard