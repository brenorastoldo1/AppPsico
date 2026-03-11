import React, { useState } from 'react';
import { formatDateLocal } from '../utils/dateUtils';

const NewPatientModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
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
        if (!formData.name) return;

        onSave({
            ...formData,
            status: 'Active',
            lastVisit: formatDateLocal(new Date()), // Default to today as registration date
            age: 0 // Placeholder or optional
        });

        // Reset
        setFormData({ name: '', email: '', phone: '' });
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
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Add New Patient</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="glass-panel"
                            style={{ width: '100%', padding: '0.75rem', color: 'white', background: 'rgba(0,0,0,0.2)' }}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="glass-panel"
                            style={{ width: '100%', padding: '0.75rem', color: 'white', background: 'rgba(0,0,0,0.2)' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="glass-panel"
                            style={{ width: '100%', padding: '0.75rem', color: 'white', background: 'rgba(0,0,0,0.2)' }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Patient</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPatientModal;
