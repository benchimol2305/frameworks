useState } from 'react';

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