import React from 'react';

const Sidebar = ({ activeTab, onTabChange }) => (
    <aside style={{
        width: '260px',
        borderRight: '1px solid var(--color-border)',
        padding: 'var(--spacing-lg)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-bg-secondary)'
    }}>
        <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.025em'
        }}>
            MindSpace
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
                className={`btn ${activeTab === 'agenda' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={() => onTabChange('agenda')}
            >
                <span>📅</span> Agenda
            </button>
            <button
                className={`btn ${activeTab === 'patients' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={() => onTabChange('patients')}
            >
                <span>👥</span> Patients
            </button>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--color-text-muted)' }}>
                <span>⚙️</span> Settings
            </button>
        </div>
    </aside>
);

export default Sidebar;
