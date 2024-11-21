import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerLogin from './pages/CustomerLogin';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import Customerdashboard from './pages/Customerdashboard.js';

import LoginPage from './pages/LoginPage';

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/customer-login" element={<CustomerLogin />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/customer/dashboard" element={<Customerdashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default App;
