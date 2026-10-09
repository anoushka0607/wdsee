import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard.jsx'
import Members from './pages/Members.jsx'
import Sports from './pages/Sports.jsx'
import TrainingSchedule from './pages/TrainingSchedule.jsx'
import Events from './pages/Events.jsx'
import Announcements from './pages/Announcements.jsx'
import { supabase } from './lib/supabaseClient'
function App() {
 const [activePage, setActivePage] = useState('Dashboard') 
  async function handleSignOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    alert('Unable to sign out: ' + error.message)
    return
  }

  alert('Signed out successfully!')
}

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="logo">🏆 SportSphere</h2>
        <p className="club-label">CLUB MANAGEMENT</p>

       
<nav className="navigation">
  {[
    'Dashboard',
    'Members',
    'Sports',
    'Training Schedule',
    'Events',
    'Announcements',
  ].map((page) => (
    <button
      key={page}
      type="button"
      className={`nav-link ${activePage === page ? 'active' : ''}`}
      onClick={() => setActivePage(page)}
    >
      {page === 'Dashboard' && '🏠'}
      {page === 'Members' && '👥'}
      {page === 'Sports' && '⚽'}
      {page === 'Training Schedule' && '📅'}
      {page === 'Events' && '🏆'}
      {page === 'Announcements' && '📢'}
      {' '}{page}
    </button>
  ))}
</nav>

    <div className="sidebar-bottom">
  <p>Sports Club</p>
  <span>Management Portal</span>

  <button
    type="button"
    className="nav-link"
    onClick={handleSignOut}
  >
    🚪 Sign Out
  </button>
</div>
        
      </aside>

      <main className="main-content" id="dashboard">
      
<header className="topbar">
  <div>
    <p className="eyebrow">SPORTS CLUB MANAGEMENT</p>
    <h1>{activePage}</h1>
  </div>
  <div className="profile">
    <span className="avatar">A</span>
    <div>
      <strong>Admin</strong>
      <p>Club Administrator</p>
    </div>
  </div>
</header>



        {activePage === 'Members' && <Members />}
        {activePage === 'Dashboard' && <Dashboard />}
        {activePage === 'Sports' && <Sports />}
        {activePage === 'Training Schedule' && <TrainingSchedule />}
        {activePage === 'Events' && <Events />}
        {activePage === 'Announcements' && <Announcements />}

        <footer className="footer">
          Sports Club Management System · Your club, connected.
        </footer>
      </main>
    </div>
  )
}

export default App