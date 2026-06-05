import React, { useState } from 'react';
import Login from './components/Login';
import ContactCard from './components/ContactVersions';
import ContactPopup from './components/ContactPopup';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Inicializamos los contactos buscando si ya hay guardados en el navegador.
  // Si no hay ninguno, cargamos el contacto de prueba inicial.
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contactos_agenda');
    return savedContacts ? JSON.parse(savedContacts) : [
      { id: 1, numero: '0424-7654321', nombre: 'César', apellido: 'Davila', foto: '', notas: 'Contacto de prueba inicial guardado permanentemente en el navegador.', apodos: 'Benchi' }
    ];
  });

  const [form, setForm] = useState({ id: null, numero: '', nombre: '', apellido: '', foto: '', notas: '', apodos: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [globalVersion, setGlobalVersion] = useState('classic');
  const [selectedContact, setSelectedContact] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Funcion auxiliar para actualizar el estado y el localStorage al mismo tiempo
  const saveContactsData = (newContactsList) => {
    setContacts(newContactsList);
    localStorage.setItem('contactos_agenda', JSON.stringify(newContactsList));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updated = contacts.map(c => c.id === form.id ? form : c);
      saveContactsData(updated);
      setIsEditing(false);
    } else {
      const newContact = { ...form, id: Date.now() };
      saveContactsData([...contacts, newContact]);
    }
    setForm({ id: null, numero: '', nombre: '', apellido: '', foto: '', notas: '', apodos: '' });
  };

  const handleEditSelect = (contact) => {
    setForm(contact);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
      const filtered = contacts.filter(c => c.id !== id);
      saveContactsData(filtered);
    }
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div style={{ padding: '25px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd', paddingBottom: '15px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, color: '#333', fontSize: '26px' }}>📋 Proyecto #1: Agenda de Contactos</h1>
        <button onClick={() => setIsAuthenticated(false)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </header>

      <div style={{ marginBottom: '25px', padding: '15px', background: '#e9ecef', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label><strong>vistas:</strong></label>
        <select value={globalVersion} onChange={(e) => setGlobalVersion(e.target.value)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}>
          <option value="classic">Diseño Clásico</option>
          <option value="minimalist">Enfoque Minimalista</option>
          <option value="dark">Estilo Modo Oscuro</option>
          <option value="playful">Estética Divertida</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
          <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
            {isEditing ? ' Modificar Datos del Contacto' : ' Registrar Nuevo Contacto'}
          </h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre *" value={form.nombre} onChange={handleChange} required style={{ width: '100%', marginBottom: '12px', padding: '8px', boxSizing: 'border-box' }} />
            <input type="text" name="apellido" placeholder="Apellido *" value={form.apellido} onChange={handleChange} required style={{ width: '100%', marginBottom: '12px', padding: '8px', boxSizing: 'border-box' }} />
            <input type="text" name="numero" placeholder="Número Telefónico *" value={form.numero} onChange={handleChange} required style={{ width: '100%', marginBottom: '12px', padding: '8px', boxSizing: 'border-box' }} />
            <input type="text" name="foto" placeholder="URL de la Foto de Perfil (Opcional)" value={form.foto} onChange={handleChange} style={{ width: '100%', marginBottom: '12px', padding: '8px', boxSizing: 'border-box' }} />
            <input type="text" name="apodos" placeholder="Apodo o Pseudónimo" value={form.apodos} onChange={handleChange} style={{ width: '100%', marginBottom: '12px', padding: '8px', boxSizing: 'border-box' }} />
            <textarea name="notas" placeholder="Escribe notas o comentarios sobre el contacto..." value={form.notas} onChange={handleChange} style={{ width: '100%', marginBottom: '15px', padding: '8px', boxSizing: 'border-box', height: '80px', resize: 'none' }} />
            
            <button type="submit" style={{ background: isEditing ? '#28a745' : '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
              {isEditing ? 'Actualizar Contacto' : 'Añadir a la Agenda'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setForm({ id: null, numero: '', nombre: '', apellido: '', foto: '', notas: '', apodos: '' }); }} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '6px' }}>
                Cancelar Modificación
              </button>
            )}
          </form>
        </div>

        <div style={{ flex: '2', minWidth: '320px' }}>
          <h3>Mis Contactos Guardados</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            {contacts.length === 0 ? (
              <p style={{ color: '#777', fontStyle: 'italic' }}>Tu agenda está vacía en este momento.</p>
            ) : (
              contacts.map(contact => (
                <ContactCard 
                  key={contact.id} 
                  contact={contact} 
                  version={globalVersion} 
                  onDelete={handleDelete}
                  onEdit={handleEditSelect}
                  onSelect={setSelectedContact}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <ContactPopup contact={selectedContact} onClose={() => setSelectedContact(null)} />
    </div>
  );
}