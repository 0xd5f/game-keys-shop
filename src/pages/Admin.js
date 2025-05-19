import React, { useState } from 'react';
import AdminPanel from '../components/AdminPanel';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem('admin_auth'));
  const navigate = useNavigate();

  const handleLogin = (password) => {
    if (password === 'admin123') {
      localStorage.setItem('admin_auth', '1');
      setIsAuth(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuth(false);
    navigate('/');
  };

  if (!isAuth) {
    return (
      <div className="max-w-xs mx-auto p-4">
        <h2 className="text-lg font-bold mb-4">Admin Login</h2>
        <form onSubmit={e => { e.preventDefault(); handleLogin(e.target.password.value); }}>
          <input name="password" type="password" placeholder="Password" className="w-full mb-2 px-3 py-2 border rounded" />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
      </div>
    );
  }

  return <AdminPanel onLogout={handleLogout} />;
}

export default Admin; 