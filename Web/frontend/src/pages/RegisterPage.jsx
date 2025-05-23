import React, { useState } from 'react';
import api from '../api';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      if (res.status === 201) {
        alert('✅ Успешно зарегистрирован!');
      } else {
        alert('❌ Ошибка регистрации');
      }
    } catch (err) {
      alert('❌ Ошибка регистрации');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegisterPage;
