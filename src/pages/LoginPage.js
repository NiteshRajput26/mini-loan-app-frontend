import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const role = new URLSearchParams(location.search).get('role');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (email && password) {
            // Simulate login API call
            if (role === 'customer') {
                navigate('/customer-dashboard');
            } else if (role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                alert('Invalid role!');
            }
        } else {
            alert('Please fill all fields.');
        }
    };

    return (
        <div>
            <h1>{role === 'customer' ? 'Customer Login' : 'Admin Login'}</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
