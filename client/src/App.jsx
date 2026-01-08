import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserForm from './components/UserForm.jsx';
import UserList from './components/UserList.jsx';

const API_URL = 'http://localhost:5000/api/users';

function App() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', age: '' });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_URL);
            setUsers(res.data);
        } catch (err) {
            toast.error('Failed to fetch users');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${API_URL}/${editingId}`, form);
                toast.success('User updated');
            } else {
                await axios.post(API_URL, form);
                toast.success('User added');
            }
            setForm({ name: '', email: '', age: '' });
            setEditingId(null);
            fetchUsers();
        } catch (err) {
            toast.error('Operation failed');
        }
    };

    const handleEdit = (user) => {
        setForm(user);
        setEditingId(user._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                toast.success('User deleted');
                fetchUsers();
            } catch (err) {
                toast.error('Delete failed');
            }
        }
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Advanced MERN CRUD App
            </Typography>

            <UserForm form={form} setForm={setForm} handleSubmit={handleSubmit} editingId={editingId} />

            {loading ? (
                <CircularProgress />
            ) : (
                <UserList users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
            )}

            <ToastContainer position="top-right" autoClose={2000} />
        </Container>
    );
}

export default App;
