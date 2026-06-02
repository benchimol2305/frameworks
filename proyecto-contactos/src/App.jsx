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
          <h1>Hola</h1>
          <p>se inicio bien.</p>
          <button onClick={() => setIsAuthenticated(false)}>Cerrar sesionn</button>
        </div>
      )}
    </div>
  );
}