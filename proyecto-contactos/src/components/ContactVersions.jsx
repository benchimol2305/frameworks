import React from 'react';

export default function ContactCard({ contact, version, onDelete, onEdit, onSelect }) {
  const fotoPredeterminada = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
  const imagenMostrar = contact.foto ? contact.foto : fotoPredeterminada;

  // --- Version Clasica ---
  if (version === 'classic') {
    return (
      <div className="contact-card version-classic">
        <div style={{ display: 'flex', gap: '12px' }}>
          <img src={imagenMostrar} alt="avatar" className="contact-avatar" />
          <div style={{ overflow: 'hidden' }}>
            <h4 style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.nombre} {contact.apellido}</h4>
            <p style={{ margin: '4px 0', fontSize: '14px', color: '#555' }}>{contact.numero}</p>
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#777', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <b>Apodo:</b> {contact.apodos || 'Ninguno'}
        </div>
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
          <button onClick={() => onSelect(contact)}>Ver</button>
          <button onClick={() => onEdit(contact)}>Editar</button>
          <button onClick={() => onDelete(contact.id)} style={{ color: 'red' }}>Borrar</button>
        </div>
      </div>
    );
  }
}