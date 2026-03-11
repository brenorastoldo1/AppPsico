import React from 'react';
import { formatDateLocal } from '../utils/dateUtils';

const CalendarWeekView = ({ currentDate, appointments, onDateClick }) => {
    const getWeekDates = (date) => {
        const curr = new Date(date);
        const day = curr.getDay(); // 0 is Sunday
        const first = curr.getDate() - day; // First day is the day of the month - the day of the week

        const week = [];
        for (let i = 0; i < 7; i++) {
            let next = new Date(curr);
            next.setDate(first + i);
            week.push(next);
        }
        return week;
    };

    const weekDates = getWeekDates(currentDate);
    const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

            {/* Header with Dates */}
            <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(7, 1fr)', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ padding: '1rem' }}></div> {/* Time column header placeholder */}
                {weekDates.map((date, idx) => {
                    const isToday = formatDateLocal(new Date()) === formatDateLocal(date);
                    return (
                        <div key={idx} style={{
                            padding: '1rem',
                            textAlign: 'center',
                            borderLeft: '1px solid rgba(255,255,255,0.05)',
                            background: isToday ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                            color: isToday ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)'
                        }}>
                            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{date.getDate()}</div>
                        </div>
                    );
                })}
            </div>

            {/* Scrollable Time Grid */}
            <div className="glass-panel" style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: '50px repeat(7, 1fr)', padding: 0 }}>
                {hours.map(hour => (
                    <React.Fragment key={hour}>
                        {/* Time Label */}
                        <div style={{
                            padding: '0.5rem',
                            textAlign: 'right',
                            fontSize: '0.8rem',
                            color: 'var(--color-text-muted)',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            borderRight: '1px solid var(--color-border)'
                        }}>
                            {hour}:00
                        </div>

                        {/* Day Columns for this hour */}
                        {weekDates.map((date, idx) => {
                            const dateStr = formatDateLocal(date);
                            // Find appointments for this day AND this hour
                            const hourApps = appointments.filter(app => {
                                if (app.date !== dateStr) return false;
                                const appHour = parseInt(app.time.split(':')[0]);
                                return appHour === hour;
                            });

                            return (
                                <div key={`${dateStr}-${hour}`} style={{
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    borderLeft: '1px solid rgba(255,255,255,0.05)',
                                    padding: '2px',
                                    minHeight: '60px',
                                    position: 'relative'
                                }}
                                    onClick={() => onDateClick(dateStr)} // Simplification: just open day/modal on click
                                >
                                    {hourApps.map(app => (
                                        <div key={app.id} style={{
                                            backgroundColor: 'var(--color-accent-primary)',
                                            color: 'white',
                                            padding: '2px 4px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}>
                                            {app.patient}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default CalendarWeekView;
