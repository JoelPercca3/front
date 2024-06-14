import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error de login:', error);
      if (error.response) {
        if (error.response.status === 401) {
          alert('Credenciales inválidas');
        } else {
          alert('Error interno del servidor');
        }
      } else {
        alert('Error de red. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Entrar
        </button>
        <p className="mt-4">
          ¿No tienes cuenta? <a href="/register" className="text-blue-500">Regístrate ahora</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
