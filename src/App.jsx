import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Settings, LogOut, FileText, Bell } from 'lucide-react';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ActionPlansPage from './pages/ActionPlansPage';
import RemindersPage from './pages/RemindersPage';
import SettingsPage from './pages/SettingsPage';
import InputSection from './components/InputSection';
import TaskBoard from './components/TaskBoard';

// ----- Sidebar -----
function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (active) => ({
    display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem',
    borderRadius: '8px', textDecoration: 'none', fontWeight: 500,
    background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
    transition: 'all 0.2s',
  });

  return (
    <aside className="glass-panel" style={{ width: '260px', minWidth: '260px', borderRadius: '0 16px 16px 0', borderLeft: 'none', padding: '2rem 1.25rem', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', textDecoration: 'none' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', padding: '0.5rem', borderRadius: '8px', flexShrink: 0 }}>
          <CheckSquare size={22} color="white" />
        </div>
        <span style={{ fontSize: '1.4rem', fontWeight: 700, background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TaskSense</span>
      </Link>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
        <Link to="/dashboard" style={navLinkStyle(isActive('/dashboard'))}>
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link to="/action-plans" style={navLinkStyle(isActive('/action-plans'))}>
          <FileText size={20} /> Action Plans
        </Link>
        <Link to="/reminders" style={navLinkStyle(isActive('/reminders'))}>
          <Bell size={20} /> Reminders
        </Link>
        <Link to="/settings" style={navLinkStyle(isActive('/settings'))}>
          <Settings size={20} /> Settings
        </Link>
      </nav>

      <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--surface-border)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: '8px', transition: 'all 0.2s' }}>
          <LogOut size={20} /> Logout
        </Link>
      </div>
    </aside>
  );
}

// ----- Dashboard -----
function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState('');

  // Receives real data from Flask via InputSection
  const handleExtract = (data) => {
    setTasks(data.tasks || []);
    setSummary(data.summary || '');
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome back! 👋</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Paste your chat below to extract action items instantly.</p>
        </div>
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981', animation: 'pulse 2s infinite' }}></div>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>NLP Engine Online</span>
        </div>
      </header>

      <InputSection onExtract={handleExtract} />

      {summary && (
        <div className="glass-card animate-fade-in" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--accent-primary)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} style={{ color: 'var(--accent-primary)' }} /> Discussion Summary
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>{summary}</p>
        </div>
      )}

      <TaskBoard tasks={tasks} />
    </div>
  );
}

// ----- App Layout for authenticated pages -----
function AppLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2.5rem 3rem', maxWidth: '1100px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}

// ----- Root App -----
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
        <Route path="/action-plans" element={<AppLayout><ActionPlansPage /></AppLayout>} />
        <Route path="/reminders" element={<AppLayout><RemindersPage /></AppLayout>} />
        <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
