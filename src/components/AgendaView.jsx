import React, { useState } from 'react';
import NewAppointmentModal from './NewAppointmentModal';
import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';
import { formatDateLocal } from '../utils/dateUtils';

const AgendaItem = ({ appointment }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'var(--color-success)';
            case 'pending': return '#f59e0b'; // Amber 500
            default: return 'var(--color-text-muted)';
        }
    };

    return (
        <div className="glass-panel" style={{
            padding: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'transform 0.2s',
            cursor: 'pointer'
        }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px' }}>
                    <div style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: 'var(--color-text-primary)',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '0.25rem'
                    }}>
                        {appointment.time}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{appointment.date}</span>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.25rem' }}>{appointment.patient}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{appointment.type}</p>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', color: 'var(--color-accent-primary)' }}>${appointment.amount}</div>
                    <span style={{
                        fontSize: '0.75rem',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '4px',
                        backgroundColor: appointment.paymentStatus === 'paid' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: appointment.paymentStatus === 'paid' ? 'var(--color-success)' : 'var(--color-danger)',
                        textTransform: 'uppercase'
                    }}>
                        {appointment.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: getStatusColor(appointment.status)
                    }} />
                </div>

            </div>
        </div>
    );
};

const AgendaView = ({ appointments, patients, onAddAppointment }) => {
    const [view, setView] = useState('day'); // 'day', 'week', 'month'
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveAppointment = (newAppointment) => {
        onAddAppointment(newAppointment);
    };

    const navigateDate = (direction) => {
        const newDate = new Date(currentDate);
        if (view === 'month') {
            newDate.setMonth(currentDate.getMonth() + direction);
        } else if (view === 'week') {
            newDate.setDate(currentDate.getDate() + (direction * 7));
        } else {
            newDate.setDate(currentDate.getDate() + direction);
        }
        setCurrentDate(newDate);
    };

    const getHeaderTitle = () => {
        const options = { month: 'long', year: 'numeric' };
        if (view === 'day') options.day = 'numeric';
        return currentDate.toLocaleDateString('en-US', options);
    };

    const filteredAppointments = appointments.filter(app => {
        // Very basic filtering for Day view
        if (view === 'day') return app.date === formatDateLocal(currentDate);
        return true; // Week and Month handle their own display logic
    });

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div>
                        <h1 className="section-title" style={{ marginBottom: '0.25rem' }}>Agenda</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button onClick={() => navigateDate(-1)} className="btn btn-ghost" style={{ padding: '0.25rem' }}>◀</button>
                            <span style={{ fontSize: '1.1rem', fontWeight: 500, minWidth: '150px', textAlign: 'center' }}>{getHeaderTitle()}</span>
                            <button onClick={() => navigateDate(1)} className="btn btn-ghost" style={{ padding: '0.25rem' }}>▶</button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: 'var(--radius-sm)', marginLeft: '1rem' }}>
                        {['day', 'week', 'month'].map(v => (
                            <button
                                key={v}
                                onClick={() => setView(v)}
                                className="btn"
                                style={{
                                    padding: '0.25rem 0.75rem',
                                    fontSize: '0.85rem',
                                    backgroundColor: view === v ? 'var(--color-bg-tertiary)' : 'transparent',
                                    color: view === v ? 'white' : 'var(--color-text-secondary)',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    <span>+</span> New Appointment
                </button>
            </header>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {view === 'month' && (
                    <CalendarMonthView
                        currentDate={currentDate}
                        appointments={appointments}
                        onDateClick={(dateStr) => {
                            setCurrentDate(new Date(dateStr + 'T12:00:00')); // Safe mid-day parse or just yyyy-mm-dd
                            setView('day');
                        }}
                    />
                )}

                {view === 'week' && (
                    <CalendarWeekView
                        currentDate={currentDate}
                        appointments={appointments}
                        onDateClick={(dateStr) => {
                            setCurrentDate(new Date(dateStr + 'T12:00:00'));
                            setView('day');
                        }}
                    />
                )}

                {view === 'day' && (
                    <>
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map(app => (
                                <AgendaItem key={app.id} appointment={app} />
                            ))
                        ) : (
                            <div style={{
                                marginTop: '2rem',
                                padding: '2rem',
                                border: '2px dashed var(--color-border)',
                                borderRadius: 'var(--radius-lg)',
                                textAlign: 'center',
                                color: 'var(--color-text-muted)'
                            }}>
                                <p>No appointments for this day.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            <NewAppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveAppointment}
                patients={patients}
            />
        </div>
    );
};

export default AgendaView;
