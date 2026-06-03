import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Si no se rellena, dejamos al 'admin' por defecto.
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem('usuarios_agenda');
    return savedUsers ? JSON.parse(savedUsers) : [{ user: 'admin', pass: '1234' }];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (isRegistering) {
      const userExists = registeredUsers.some(u => u.user.toLowerCase() === username.toLowerCase());
      
      if (userExists) {
        setErrorMessage('Este usuario ya esta registrado. Intenta con otro.');
      } else {
        const updatedUsers = [...registeredUsers, { user: username, pass: password }];
        
        // Guardamos la nueva lista en el estado y la respaldamos en localStorage
        setRegisteredUsers(updatedUsers);
        localStorage.setItem('usuarios_agenda', JSON.stringify(updatedUsers));
        
        setSuccessMessage('¡Registro exitoso! Ya puedes iniciar sesion.');
        setIsRegistering(false);
        setPassword('');
      }
    } else {
      const validUser = registeredUsers.find(u => u.user === username && u.pass === password);

      if (validUser) {
        onLoginSuccess();
      } else {
        setErrorMessage('Usuario o contraseña incorrectos.');
      }
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage('');
    setSuccessMessage('');
    setUsername('');
    setPassword('');
  };

  return (
    <div style={{ maxWidth: '340px', margin: '120px auto', padding: '30px', border: '1px solid #e0e0e0', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginTop: 0, color: '#333' }}>
        {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Usuario:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} required />
        </div>

        {errorMessage && <p style={{ color: '#dc3545', fontSize: '14px', margin: '10px 0' }}>⚠️ {errorMessage}</p>}
        {successMessage && <p style={{ color: '#28a745', fontSize: '14px', margin: '10px 0' }}>✅ {successMessage}</p>}

        <button type="submit" style={{ width: '100%', padding: '10px', background: isRegistering ? '#28a745' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}>
          {isRegistering ? 'Registrarse' : 'Ingresar'}
        </button>
      </form>

      <div style={{ textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta aún?'}
        </p>
        <button onClick={toggleMode} style={{ background: 'none', border: 'none', color: '#007bff', fontWeight: 'bold', cursor: 'pointer', padding: '5px', marginTop: '5px', textDecoration: 'underline' }}>
          {isRegistering ? 'iniciari sesion' : 'Registro aqui'}
        </button>
      </div>
    </div>
  );
}