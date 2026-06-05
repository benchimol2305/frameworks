import React from 'react';

export default function ContactCard({ contact, version, onDelete, onEdit, onSelect }) {
  const fotoPredeterminada = "https://i.imgur.com/8NfVb37.png";
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

  // --- version minimalista ---
  if (version === 'minimalist') {
    return (
      <div className="contact-card version-minimalist">
        <div>
          <h4 style={{ margin: 0, textTransform: 'uppercase', fontSize: '14px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{contact.apellido}, {contact.nombre}</h4>
          <p style={{ margin: '4px 0', fontWeight: 'bold', color: '#333' }}>{contact.numero}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
          <span style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => onSelect(contact)}>Detalles</span>
          <span style={{ cursor: 'pointer', color: '#28a745' }} onClick={() => onEdit(contact)}>Editar</span>
          <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(contact.id)}>Eliminar</span>
        </div>
      </div>
    );
  }

  // --- modo oscuro ---
  if (version === 'dark') {
    return (
      <div className="contact-card version-dark">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ overflow: 'hidden', paddingRight: '5px' }}>
            <h5 style={{ margin: 0, color: '#17a2b8', fontSize: '15px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{contact.nombre}</h5>
            <small style={{ color: '#bbb' }}>{contact.numero}</small>
          </div>
          <img src={imagenMostrar} alt="avatar" className="contact-avatar" style={{ width: '35px', height: '35px' }} />
        </div>
        <p style={{ fontSize: '12px', margin: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#aaa' }}>
          {contact.notas || 'Sin notas asignadas'}
        </p>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button style={{ background: '#444', color: '#fff', border: 'none', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => onSelect(contact)}>Popup</button>
          <button style={{ background: '#444', color: '#fff', border: 'none', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => onEdit(contact)}>Editar</button>
          <button style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => onDelete(contact.id)}>X</button>
        </div>
      </div>
    );
  }

  // --- divertida---
  return (
    <div className="contact-card version-playful">
      <div style={{ textAlign: 'center', overflow: 'hidden' }}>
        <b style={{ fontSize: '15px', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>⭐ {contact.apodos || contact.nombre} ⭐</b>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#856404' }}>📞 {contact.numero}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', background: 'rgba(255,255,255,0.6)', padding: '5px', borderRadius: '8px' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onSelect(contact)}>🔍</button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onEdit(contact)}>✏️</button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onDelete(contact.id)}>🗑️</button>
      </div>
    </div>
  );
}

