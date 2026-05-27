import React from 'react';
import { Calendar, User, AlertCircle, CheckCircle } from 'lucide-react';

export default function TaskBoard({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', marginTop: '2rem' }}>
        <CheckCircle size={48} style={{ color: 'var(--text-secondary)', margin: '0 auto 1rem', opacity: 0.5 }} />
        <h3 style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>No action items extracted yet</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', opacity: 0.8 }}>
          Paste a discussion above to automatically generate tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem', marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertCircle size={24} className="text-gradient" />
          Extracted Action Plan
        </h2>
        <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c4b5fd', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
          {tasks.length} Tasks Found
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {tasks.map((task, index) => (
          <div key={index} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className={`badge ${task.priority.toLowerCase()}`}>
                {task.priority} Priority
              </span>
            </div>
            
            <h4 style={{ fontSize: '1.125rem', lineHeight: '1.4' }}>{task.task}</h4>
            
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--surface-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <User size={16} />
                <span>{task.person}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <Calendar size={16} />
                <span>{task.deadline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button className="btn-primary" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-primary)' }}>
          Export to CSV
        </button>
        <button className="btn-primary">
          Export to PDF
        </button>
      </div>
    </div>
  );
}
