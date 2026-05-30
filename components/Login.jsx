import React, {useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Credenciales de prueba fijas
    if (username === 'admin' && password === '1234') {
      onLoginSuccess();
    } else {
      setError('Credenciales incorrectas. Intenta con admin / 1234');
    }
};

return (
    <div style={{ maxWidth: '300px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Usuario: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ width: '100%', padding: '6px' }}
            required 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Contraseña: </label>