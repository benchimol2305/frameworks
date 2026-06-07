import React, { useState } from 'react';
import Login from './components/Login';
import ContactCard from './components/ContactVersions';
import ContactPopup from './components/ContactPopup';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [contacts, setContacts] = useState(() => { // Cargamos los contactos desde localStorage o usamos un contacto de ejemplo si no hay datos guardados
    const savedContacts = localStorage.getItem('contactos_agenda');
    return savedContacts ? JSON.parse(savedContacts) : [
      { id: 1, numero: '0424-7654321', nombre: 'Cesar', apellido: 'Benchimol', foto: '', notas: 'Esto es una prueba que se hace para poder ver si hace bien el crop y por eso es tan largo', apodos: 'Benchi' }
    ];
  });

  const [form, setForm] = useState({ id: null, numero: '', nombre: '', apellido: '', foto: '', notas: '', apodos: '' }); //manejar el formulario
  const [isEditing, setIsEditing] = useState(false);
  
  const [globalVersion, setGlobalVersion] = useState('standard'); 
  const [globalDesign, setGlobalDesign] = useState('classic');
  const [selectedContact, setSelectedContact] = useState(null); // Para mostrar el popup de detalles del contacto seleccionado

  const handleChange = (e) => { // Maneja los cambios en el formulario de contacto
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveContactsData = (newContactsList) => { // Funcion para actualizar el estado de contactos y sincronizar con localStorage
    setContacts(newContactsList);
    localStorage.setItem('contactos_agenda', JSON.stringify(newContactsList));
  };

  const handleSubmit = (e) => { // envio del formulario para agregar o editar un contacto
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
    if (window.confirm('¿Deseas eliminar este contacto?')) {
      const filtered = contacts.filter(c => c.id !== id);
      saveContactsData(filtered);
    }
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // aqui empezamos con la logica de las vistas 
  const renderContactsByLayout = () => {
    if (contacts.length === 0) {
      return <p style={{ color: '#777', fontStyle: 'italic' }}>Tu agenda está vacía.</p>;
    }

    // Vista estandar
    if (globalVersion === 'standard') {
      return (
        <div className="view-container-standard">
          {contacts.map(c => (
            <ContactCard key={c.id} contact={c} version="standard" design={globalDesign} onDelete={handleDelete} onEdit={handleEditSelect} onSelect={setSelectedContact} />
          ))}
        </div>
      );
    }

    // vista en bloque
    if (globalVersion === 'block') {
      return (
        <div className="view-container-block">
          {contacts.map(c => (
            <ContactCard key={c.id} contact={c} version="block" design={globalDesign} onDelete={handleDelete} onEdit={handleEditSelect} onSelect={setSelectedContact} />
          ))}
        </div>
      );
    }

    // vista compacta tipo html
    if (globalVersion === 'compact') {
      return (
        <table className="view-container-compact">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre Completo</th>
              <th>Teléfono</th>
              <th>Apodo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <ContactCard key={c.id} contact={c} version="compact" design={globalDesign} onDelete={handleDelete} onEdit={handleEditSelect} onSelect={setSelectedContact} />
            ))}
          </tbody>
        </table>
      );
    }

    // vista para contacto destacado
    if (globalVersion === 'featured') {
      const foco = contacts[0]; // Primer contacto 
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
          {/* llamamos a la vista 4 */}
          <div style={{ flex: '1', minWidth: '250px' }}>
            <ContactCard contact={foco} version="featured-row" design={globalDesign} onDelete={handleDelete} onEdit={handleEditSelect} onSelect={setSelectedContact} />
          </div>
          
          {/* Lista subordinada de apoyo */}
          <div style={{ flex: '1.5', minWidth: '260px', background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <small style={{ color: '#666', fontWeight: 'bold' }}>Otros miembros en agenda ({contacts.length}):</small>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {contacts.map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#f8f9fa', borderRadius: '4px', fontSize: '14px' }}>
                  <span className="crop-text" title={`${c.nombre} ${c.apellido}`} style={{ fontWeight: '500' }}>{c.nombre} {c.apellido}</span>
                  <span style={{ color: '#007bff', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setSelectedContact(c)}>Ver Detalles</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ padding: '25px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd', paddingBottom: '15px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, color: '#333', fontSize: '24px' }}>📋 Bienvenido, Cesar</h1>
        <button onClick={() => setIsAuthenticated(false)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </header>

      {/* doble panel de control de seleccion */}
      <div style={{ marginBottom: '25px', padding: '15px', background: '#e9ecef', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label><strong>1. Modo de Vista:</strong></label>
          <select value={globalVersion} onChange={(e) => setGlobalVersion(e.target.value)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer', fontWeight: 'bold' }}>
            <option value="standard">Vista 1: Estándar (Lista)</option>
            <option value="block">Vista 2: En Bloque (Tarjetas)</option>
            <option value="compact">Vista 3: Compacta (Tabla)</option>
            <option value="featured">Vista 4: Destacada (Enfoque)</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label><strong>2. Tema de Diseño :</strong></label>
          <select value={globalDesign} onChange={(e) => setGlobalDesign(e.target.value)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer', fontWeight: 'bold' }}>
            <option value="classic">Diseño 1: Clásico (Borde azul)</option>
            <option value="minimalist">Diseño 2: Minimalista (Limpio)</option>
            <option value="dark">Diseño 3: Modo Oscuro</option>
            <option value="playful">Diseño 4: Divertido (Llamativo)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {/* formulario */}
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
            {isEditing ? ' Modificar Contacto' : '👤 Registrar Contacto'}
          </h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre *" value={form.nombre} onChange={handleChange} required style={{ width: '100%', marginBottom: '12px', padding: '8px', boxSizing: 'border-box' }} />
            <input type="text" name="apellido" placeholder="Apellido *" value={form.apellido} onChange={handleChange} required style={{ width: '100%', marginBottom: '12px', padding: '8px', boxSizing: 'border-box' }} />
            <input type="text" name="numero" placeholder="Número Telefónico *" value={form.numero} onChange={handleChange} required style={{ width: '100%', marginBottom: '12px', padding: '8px', boxSizing: 'border-box' }} />
            <input type="text" name="foto" placeholder="URL de la Foto de Perfil" value={form.foto} onChange={handleChange} style={{ width: '100%', marginBottom: '12px', padding: '8px', boxSizing: 'border-box' }} />
            <input type="text" name="apodos" placeholder="Apodo" value={form.apodos} onChange={handleChange} style={{ width: '100%', marginBottom: '12px', padding: '8px', boxSizing: 'border-box' }} />
            <textarea name="notas" placeholder="Escribe notas..." value={form.notas} onChange={handleChange} style={{ width: '100%', marginBottom: '15px', padding: '8px', boxSizing: 'border-box', height: '60px', resize: 'none' }} />
            
            <button type="submit" style={{ background: isEditing ? '#28a745' : '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
              {isEditing ? 'Actualizar' : 'Añadir'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setForm({ id: null, numero: '', nombre: '', apellido: '', foto: '', notas: '', apodos: '' }); }} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '6px' }}>
                Cancelar
              </button>
            )}
          </form>
        </div>

        {/*contenedor para la agenda */}
        <div style={{ flex: '2', minWidth: '320px' }}>
          <h3 style={{ marginTop: 0 }}>Contactos en la Agenda</h3>
          {renderContactsByLayout()}
        </div>
      </div>

      <ContactPopup contact={selectedContact} onClose={() => setSelectedContact(null)} />
    </div>
  );
}