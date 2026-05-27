import React, { useState } from 'react';
import { LayoutDashboard, CheckSquare, Settings, LogOut, FileText, Bell } from 'lucide-react';
import InputSection from './components/InputSection';
import TaskBoard from './components/TaskBoard';

function App() {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState('');

  // Mock extraction function mimicking NLP processing
  const handleExtract = (text) => {
    // Simple rule-based mock for demonstration
    const mockTasks = [
      { person: 'Vaishnavi', task: 'Prepare the PPT', deadline: 'Friday', priority: 'Medium' },
      { person: 'Rahul', task: 'Complete the backend', deadline: 'Today', priority: 'High' },
      { person: 'Priya', task: 'Check the report', deadline: 'Before submission', priority: 'Medium' },
    ];
    setTasks(mockTasks);
    setSummary('Discussed project deliverables. Frontend UI, Backend tasks, and report review assigned with respective deadlines.');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="glass-panel" style={{ width: '280px', borderRadius: '0 16px 16px 0', borderLeft: 'none', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', padding: '0.5rem', borderRadius: '8px' }}>
            <CheckSquare size={24} color="white" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '1.5rem', margin: 0 }}>TaskSense</h1>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} className="hover-nav">
            <FileText size={20} /> Action Plans
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} className="hover-nav">
            <Bell size={20} /> Reminders
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} className="hover-nav">
            <Settings size={20} /> Settings
          </a>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--surface-border)' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
            <LogOut size={20} /> Logout
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem 4rem', maxWidth: '1200px', margin: '0 auto', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome back, Team! 👋</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Extract action items instantly from your chaotic discussions.</p>
          </div>
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></div>
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>NLP Engine Online</span>
          </div>
        </header>

        <InputSection onExtract={handleExtract} />

        {summary && (
          <div className="glass-card animate-fade-in" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--accent-primary)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} className="text-gradient" /> Discussion Summary
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{summary}</p>
          </div>
        )}

        <TaskBoard tasks={tasks} />
      </main>
    </div>
  );
}

export default App;
