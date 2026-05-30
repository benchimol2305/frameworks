import React, { useState } from 'react';
import Login from './components/Login';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      {}
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h1>¡Bienvenido al sistema de contactos!</h1>
          <p>Has iniciado sesion correctamente con credenciales validas.</p>
          <button onClick={() => setIsAuthenticated(false)}>Cerrar sesionn</button>
        </div>
      )}
    </div>
  );
}