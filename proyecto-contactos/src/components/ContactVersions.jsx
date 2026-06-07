import React from 'react';

export default function ContactCard({ contact, version, design, onDelete, onEdit, onSelect }) {
  // const fotoPredeterminada = "https://i.imgur.com/8NfVb37.png"; 
  const fotoPredeterminada = "https://imgur.com/gallery/pls-vote-favorite-1QZvg8J#V17y7Xw"; 
  const imagenMostrar = contact.foto ? contact.foto : fotoPredeterminada;
  const nombreCompleto = `${contact.nombre} ${contact.apellido}`;

  // Determinamos la clase segun el diseno seleccionado
  const claseDiseno = `design-${design}`;

  // vista estandar
  if (version === 'standard') {
    return (
      <div className={`contact-row-standard ${claseDiseno}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src={imagenMostrar} alt="avatar" className="contact-avatar" />
          <div>
            <h4 className="crop-text" title={nombreCompleto} style={{ margin: 0, fontSize: '16px' }}>
              {nombreCompleto}
            </h4>
            <p style={{ margin: '2px 0 0 0', fontSize: '14px', color: '#666' }}>{contact.numero}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => onSelect(contact)}>Ver</button>
          <button onClick={() => onEdit(contact)}>Editar</button>
          <button onClick={() => onDelete(contact.id)} style={{ color: 'red' }}>Borrar</button>
        </div>
      </div>
    );
  }

  // vista en bloque
  if (version === 'block') {
    return (
      <div className={`contact-card-block ${claseDiseno}`}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <img src={imagenMostrar} alt="avatar" className="contact-avatar" />
          <div style={{ overflow: 'hidden' }}>
            <h4 className="crop-text" title={nombreCompleto} style={{ margin: 0, fontSize: '15px' }}>
              {nombreCompleto}
            </h4>
            <small style={{ color: '#777', display: 'block' }}>{contact.numero}</small>
          </div>
        </div>
        <div style={{ fontSize: '12px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          <b>Apodo:</b> {contact.apodos || 'Ninguno'}
        </div>
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
          <button onClick={() => onSelect(contact)}>Ver</button>
          <button onClick={() => onEdit(contact)}>Editar</button>
          <button onClick={() => onDelete(contact.id)} style={{ color: 'red' }}>X</button>
        </div>
      </div>
    );
  }

  // vista compacta 
  if (version === 'compact') {
    return (
      <tr className={claseDiseno}>
        <td>
          <img src={imagenMostrar} alt="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
        </td>
        <td className="crop-text" title={nombreCompleto} style={{ fontWeight: 'bold' }}>
          {nombreCompleto}
        </td>
        <td>{contact.numero}</td>
        <td style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {contact.apodos || '-'}
        </td>
        <td>
          <button onClick={() => onSelect(contact)} style={{ marginRight: '5px', padding: '2px 6px' }}>👁️</button>
          <button onClick={() => onEdit(contact)} style={{ marginRight: '5px', padding: '2px 6px' }}>✏️</button>
          <button onClick={() => onDelete(contact.id)} style={{ padding: '2px 6px', color: 'red' }}>🗑️</button>
        </td>
      </tr>
    );
  }

  // Vista especial
  if (version === 'featured-row') {
    return (
      <div className={`design-${design}`} style={{ padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 6px 15px rgba(0,0,0,0.1)', borderTop: '5px solid #ffc107' }}>
        <span style={{ background: '#ffc107', color: '#000', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>
          Contacto Destacado
        </span>
        <img src={imagenMostrar} alt="destacado" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', display: 'block', margin: '0 auto 12px auto', border: '3px solid #ffc107' }} />
        <h3 className="crop-text" title={nombreCompleto} style={{ margin: '0 0 6px 0', fontSize: '20px', maxWidth: '200px' }}>
          {nombreCompleto}
        </h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold', color: '#007bff' }}>{contact.numero}</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button onClick={() => onSelect(contact)} style={{ padding: '4px 10px' }}>Detalles</button>
          <button onClick={() => onEdit(contact)} style={{ padding: '4px 10px' }}>Editar</button>
          <button onClick={() => onDelete(contact.id)} style={{ padding: '4px 10px', color: 'red' }}>Eliminar</button>
        </div>
      </div>
    );
  }

  return null;
}