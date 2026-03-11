import React from 'react';

const CalendarMonthView = ({ currentDate, appointments, onDateClick }) => {
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        return days;
    };

    const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Padding for empty cells before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.1)' }}></div>);
    }

    // Days of the month
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const dayAppointments = appointments.filter(app => app.date === dateStr);
        const isToday = new Date().toISOString().split('T')[0] === dateStr;

        days.push(
            <div
                key={d}
                onClick={() => onDateClick(dateStr)}
                style={{
                    minHeight: '100px',
                    padding: '0.5rem',
                    border: '1px solid rgba(255,255,255,0.05)',
                    backgroundColor: isToday ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isToday ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isToday ? 'rgba(139, 92, 246, 0.1)' : 'transparent'}
            >
                <div style={{
                    fontWeight: isToday ? 'bold' : 'normal',
                    color: isToday ? 'var(--color-accent-primary)' : 'var(--color-text-primary)',
                    marginBottom: '0.25rem',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    {d}
                    {dayAppointments.length > 0 && (
                        <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '0 0.25rem', borderRadius: '4px' }}>{dayAppointments.length}</span>
                    )}
                </div>

                {/* Tiny dots/bars for appointments */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                    {dayAppointments.map(app => (
                        <div key={app.id} style={{
                            fontSize: '0.7rem',
                            backgroundColor: app.status === 'confirmed' ? 'var(--color-success)' : 'var(--color-accent-primary)',
                            color: '#000',
                            padding: '1px 4px',
                            borderRadius: '2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            opacity: 0.8
                        }}>
                            {app.time} {app.patient}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '0.5rem' }}>
                {weekDays.map(day => (
                    <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--color-text-secondary)', padding: '0.5rem' }}>
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="glass-panel" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                flex: 1,
                overflow: 'hidden', // Contain the grid
                border: '1px solid var(--color-border)'
            }}>
                {days}
            </div>
        </div>
    );
};

export default CalendarMonthView;
