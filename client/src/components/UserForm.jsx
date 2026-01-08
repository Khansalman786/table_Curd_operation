import React from 'react';
import { TextField, Button, Box } from '@mui/material';

function UserForm({ form, setForm, handleSubmit, editingId }) {
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
                label="Name"
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
                label="Email"
                type="email"
                value={form.email}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
                label="Age"
                type="number"
                value={form.age}
                required
                onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
            <Button type="submit" variant="contained" color="primary">
                {editingId ? 'Update' : 'Add'}
            </Button>
        </Box>
    );
}

export default UserForm;
