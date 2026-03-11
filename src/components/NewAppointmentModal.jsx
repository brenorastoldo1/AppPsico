
import React, { useState } from 'react';
import { formatDateLocal } from '../utils/dateUtils';

const NewAppointmentModal = ({ isOpen, onClose, onSave, patients = [] }) => {
    const [formData, setFormData] = useState({
        patient: '',
        date: formatDateLocal(new Date()),
        time: '09:00',
        type: 'Initial Consultation',
        amount: '',
        paymentStatus: 'unpaid'
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.patient || !formData.amount) return; // Basic validation

        onSave({
            ...formData,
            amount: parseFloat(formData.amount),
            status: 'confirmed'
        });

        // Reset form
        setFormData({
            patient: '',
            date: formatDateLocal(new Date()),
            time: '09:00',
            type: 'Initial Consultation',
            amount: '',
            paymentStatus: 'unpaid'
        });
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="glass-panel" style={{ width: '500px', padding: '2rem', backgroundColor: 'var(--color-bg-secondary)' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>New Appointment</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Patient</label>
                        <select
                            name="patient"
                            value={formData.patient}
                            onChange={handleChange}
                            className="glass-panel"
                            style={{ width: '100%', padding: '0.75rem', color: 'white', background: 'rgba(0,0,0,0.2)' }}
                            required
                        >
                            <option value="" disabled>Select a patient</option>
                            {patients.map(p => (
                                <option key={p.id} value={p.name} style={{ color: 'black' }}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="glass-panel"
                                style={{ width: '100%', padding: '0.75rem', color: 'white', background: 'rgba(0,0,0,0.2)' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Time</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="glass-panel"
                                style={{ width: '100%', padding: '0.75rem', color: 'white', background: 'rgba(0,0,0,0.2)' }}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="glass-panel"
                            style={{ width: '100%', padding: '0.75rem', color: 'white', background: 'rgba(0,0,0,0.2)' }}
                        >
                            <option value="Initial Consultation">Initial Consultation</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Therapy Session">Therapy Session</option>
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Amount ($)</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="glass-panel"
                                style={{ width: '100%', padding: '0.75rem', color: 'white', background: 'rgba(0,0,0,0.2)' }}
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Payment Status</label>
                            <select
                                name="paymentStatus"
                                value={formData.paymentStatus}
                                onChange={handleChange}
                                className="glass-panel"
                                style={{ width: '100%', padding: '0.75rem', color: 'white', background: 'rgba(0,0,0,0.2)' }}
                            >
                                <option value="paid">Paid</option>
                                <option value="unpaid">Not Paid</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Appointment</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewAppointmentModal;
