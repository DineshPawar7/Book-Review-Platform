import { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <input 
          name="name" 
          placeholder="Name" 
          className="input" 
          onChange={handleChange} 
          value={form.name}
        />
        
        <input 
          name="email" 
          placeholder="Email" 
          className="input" 
          onChange={handleChange} 
          value={form.email}
        />
        
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          className="input" 
          onChange={handleChange} 
          value={form.password}
        />

        <select 
          name="role" 
          className="input" 
          onChange={handleChange} 
          value={form.role}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
