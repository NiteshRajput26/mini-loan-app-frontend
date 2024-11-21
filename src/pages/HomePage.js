import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Mini Loan App</h1>
            <p>Select your role to proceed:</p>
            <div>
                <Link to="/customer-login">
                    <button>Customer Login</button>
                </Link>
                <Link to="/admin-login">
                    <button>Admin Login</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
