import React, { useState } from 'react';

const PatientDetails = ({ patient, appointments, onBack, onUpdateNotes, onTogglePayment, onDeletePatient }) => {
    const [newNote, setNewNote] = useState('');

    const handleAddNote = () => {
        if (!newNote.trim()) return;
        const date = new Date().toLocaleDateString();
        // Use patient.notes from props (or empty string if undefined)
        const updatedNotes = `${date}: ${newNote}\n\n${patient.notes || ''}`;
        onUpdateNotes(patient.id, updatedNotes);
        setNewNote('');
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${patient.name}? This action cannot be undone.`)) {
            onDeletePatient(patient.id);
            onBack();
        }
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={onBack} className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                        ← Back
                    </button>
                    <div>
                        <h1 className="section-title" style={{ marginBottom: 0 }}>{patient.name}</h1>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Patient Record • Last Visit: {patient.lastVisit}</p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="btn"
                    style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--color-danger)',
                        border: '1px solid var(--color-danger)'
                    }}
                >
                    Delete Patient
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', flex: 1, overflow: 'hidden' }}>
                {/* Info Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-accent-primary)' }}>Information</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Status</span>
                                <div style={{ color: 'var(--color-success)' }}>{patient.status}</div>
                            </div>
                            <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Email</span>
                                <div>{patient.email || 'N/A'}</div>
                            </div>
                            <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Phone</span>
                                <div>{patient.phone || 'N/A'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-accent-primary)' }}>Financial Overview</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--color-text-muted)' }}>Total Paid</span>
                                <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>
                                    ${appointments.filter(a => a.paymentStatus === 'paid').reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0)}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--color-text-muted)' }}>Outstanding</span>
                                <span style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>
                                    ${appointments.filter(a => a.paymentStatus === 'unpaid').reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area: Notes & Transactions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Notes Section */}
                    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', maxHeight: '500px' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-accent-primary)' }}>Clinical Notes</h3>

                        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <textarea
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Type new session note here..."
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid var(--color-border)',
                                    color: 'var(--color-text-primary)',
                                    resize: 'none',
                                    minHeight: '80px',
                                    fontFamily: 'inherit'
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
                            </div>
                        </div>

                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            background: 'rgba(0,0,0,0.1)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1rem',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'monospace',
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.95rem',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            {patient.notes || 'No notes available.'}
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-accent-primary)' }}>Transaction History</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {appointments.length > 0 ? (
                                appointments.sort((a, b) => new Date(b.date) - new Date(a.date)).map(app => (
                                    <div key={app.id} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0.75rem',
                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                        borderRadius: 'var(--radius-sm)'
                                    }}>
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>{app.date}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{app.type}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 'bold' }}>${app.amount}</div>
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onTogglePayment(app.id);
                                                }}
                                                style={{
                                                    fontSize: '0.75rem',
                                                    color: app.paymentStatus === 'paid' ? 'var(--color-success)' : 'var(--color-danger)',
                                                    textTransform: 'uppercase',
                                                    cursor: 'pointer',
                                                    userSelect: 'none',
                                                    border: '1px solid currentColor',
                                                    padding: '0.1rem 0.4rem',
                                                    borderRadius: '4px'
                                                }}>
                                                {app.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No transactions recorded.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDetails;
