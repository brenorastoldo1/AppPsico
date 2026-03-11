import React, { useState } from 'react';
import PatientDetails from './PatientDetails';
import NewPatientModal from './NewPatientModal';

const PatientList = ({ patients, appointments, onAddPatient, onUpdateNotes, onTogglePayment, onDeletePatient }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSavePatient = (newPatient) => {
        onAddPatient(newPatient);
        setIsModalOpen(false); // Ensure modal closes
    };

    const getPatientFinancials = (patientName) => {
        const patientAppointments = appointments.filter(app => app.patient === patientName);
        const totalPaid = patientAppointments
            .filter(app => app.paymentStatus === 'paid')
            .reduce((sum, app) => sum + (parseFloat(app.amount) || 0), 0);

        const totalDebt = patientAppointments
            .filter(app => app.paymentStatus === 'unpaid')
            .reduce((sum, app) => sum + (parseFloat(app.amount) || 0), 0);

        return { totalPaid, totalDebt };
    };

    const selectedPatient = patients.find(p => p.id === selectedPatientId);

    if (selectedPatient) {
        return (
            <PatientDetails
                patient={selectedPatient}
                appointments={appointments.filter(app => app.patient === selectedPatient.name)}
                onBack={() => setSelectedPatientId(null)}
                onUpdateNotes={onUpdateNotes}
                onTogglePayment={onTogglePayment}
                onDeletePatient={onDeletePatient}
            />
        );
    }

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(patient => ({
        ...patient,
        ...getPatientFinancials(patient.name)
    }));

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="section-title" style={{ marginBottom: 0 }}>Patients</h1>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    <span>+</span> Add Patient
                </button>
            </header>

            {/* Search Bar */}
            <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>🔍</span>
                <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text-primary)',
                        fontSize: '1rem',
                        width: '100%',
                        outline: 'none',
                        padding: '0.5rem'
                    }}
                />
            </div>

            <div className="glass-panel" style={{ flex: 1, overflow: 'hidden', padding: 0 }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', fontWeight: 'bold', color: 'var(--color-text-secondary)' }}>
                    <div>Name</div>
                    <div>Last Visit</div>
                    <div>Status</div>
                    <div style={{ textAlign: 'right' }}>Total Paid</div>
                    <div style={{ textAlign: 'right' }}>Debt</div>
                </div>
                <div style={{ overflowY: 'auto', height: 'calc(100% - 3.5rem)' }}>
                    {filteredPatients.map(patient => (
                        <div key={patient.id} style={{
                            padding: '1rem',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            display: 'grid',
                            gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
                            alignItems: 'center',
                            transition: 'background 0.2s',
                            cursor: 'pointer'
                        }}
                            className="patient-row"
                            onClick={() => setSelectedPatientId(patient.id)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <div style={{ fontWeight: 500 }}>{patient.name}</div>
                            <div style={{ color: 'var(--color-text-muted)' }}>{patient.lastVisit}</div>
                            <div>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '99px',
                                    fontSize: '0.85rem',
                                    backgroundColor: patient.status === 'Active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                                    color: patient.status === 'Active' ? 'var(--color-success)' : 'var(--color-text-muted)'
                                }}>
                                    {patient.status}
                                </span>
                            </div>
                            <div style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--color-success)' }}>
                                ${patient.totalPaid}
                            </div>
                            <div style={{ textAlign: 'right', fontWeight: 'bold', color: patient.totalDebt > 0 ? 'var(--color-danger)' : 'var(--color-text-muted)' }}>
                                ${patient.totalDebt}
                            </div>
                        </div>
                    ))}

                    {filteredPatients.length === 0 && (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                            No patients found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            </div>

            <NewPatientModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSavePatient}
            />
        </div>
    );
};

export default PatientList;
