import React from 'react';

export default function ContactPopup({ contact, onClose }) {
  if (!contact) return null; // Si no hay seleccionado, no dibuja nada en pantalla

  const fotoPredeterminada = "https://i.imgur.com/8NfVb37.png";

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Información Detallada</h3>
        <hr style={{ border: '0', borderTop: '1px solid #eee' }} />
        
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <img 
            src={contact.foto ? contact.foto : fotoPredeterminada} 
            alt="Avatar" 
            style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #007bff' }}
          />
        </div>
        
        <div style={{ fontSize: '15px', lineHeight: '1.6' }}>
          <p><strong>Nombre completo:</strong> {contact.nombre} {contact.apellido}</p>
          <p><strong>Teléfono:</strong> {contact.numero}</p>
          <p><strong>Apodo asignado:</strong> {contact.apodos || 'Ninguno'}</p>
          <p style={{ wordBreak: 'break-word' }}><strong>Notas adicionales:</strong><br /> {contact.notas || 'Sin comentarios.'}</p>
        </div>
        
        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '15px 0' }} />
        <button onClick={onClose} style={{ float: 'right', padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Cerrar Ventana
        </button>
        <div style={{ clear: 'both' }}></div>
      </div>
    </div>
  );
}