import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AgendaView from './components/AgendaView';
import PatientList from './components/PatientList';
import { formatDateLocal } from './utils/dateUtils';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('agenda');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize from LocalStorage or empty array
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('patients');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const handleAddAppointment = (newAppointment) => {
    setAppointments([...appointments, { ...newAppointment, id: Date.now() }]);
  };

  const handleAddPatient = (newPatient) => {
    setPatients([...patients, { ...newPatient, id: Date.now(), notes: '' }]);
  };

  const handleUpdateNotes = (patientId, newNotes) => {
    setPatients(patients.map(p =>
      p.id === patientId ? { ...p, notes: newNotes } : p
    ));
  };

  const handleTogglePayment = (appointmentId) => {
    setAppointments(appointments.map(app =>
      app.id === appointmentId
        ? { ...app, paymentStatus: app.paymentStatus === 'paid' ? 'unpaid' : 'paid' }
        : app
    ));
  };

  const handleDeletePatient = (patientId) => {
    setPatients(patients.filter(p => p.id !== patientId));
    // Optionally remove appointments for this patient
    // setAppointments(appointments.filter(a => a.patientId !== patientId)); 
    // Note: Current appointment structure uses 'patient' name string, which is brittle. 
    // Keeping it simple as requested, but in a real app better to link by ID.
  };

  // Close sidebar on route change on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="layout-container">
      <div className="mobile-header">
        <button
          className="hamburger-btn"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
        <h1 className="mobile-title">MindSpace</h1>
      </div>

      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="main-content">
        {activeTab === 'agenda' ? (
          <AgendaView
            appointments={appointments}
            patients={patients}
            onAddAppointment={handleAddAppointment}
          />
        ) : (
          <PatientList
            patients={patients}
            appointments={appointments}
            onAddPatient={handleAddPatient}
            onUpdateNotes={handleUpdateNotes}
            onTogglePayment={handleTogglePayment}
            onDeletePatient={handleDeletePatient}
          />
        )}
      </main>
    </div>
  );
}

export default App;
