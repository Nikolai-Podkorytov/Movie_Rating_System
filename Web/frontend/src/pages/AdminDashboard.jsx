import React, { useState, useEffect } from 'react';
import api from '../api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Функция для получения списка пользователей
  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users', {
         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(res.data);
    } catch (err) {
      setMessage('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Функция для смены роли пользователя
  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.patch(`/admin/users/${userId}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('User role updated successfully');
      fetchUsers();
    } catch (err) {
      setMessage('Error updating user role');
    }
  };

  // Функция для удаления пользователя
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setMessage('User deleted successfully');
        fetchUsers();
      } catch (err) {
        setMessage('Error deleting user');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      {message && <p>{message}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
             <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select 
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="critic">Critic</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
