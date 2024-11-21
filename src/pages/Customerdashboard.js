import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Customerdashboard = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Assuming you're sending a token for authentication
        const fetchLoans = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:5000/api/loans/customer', {

                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Loans fetched:', response.data); // Log the response data

                setLoans(response.data);
            } catch (error) {
                console.error('Error fetching loans:', error); // Log the error
                setError('Error fetching loans');
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    const handleRepay = async (loanId, repaymentId) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post(
                `/api/loans/repay`,
                { loanId, repaymentId, amount: 50 }, // Assuming you are paying an installment of 50
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Repayment Successful');
            setLoans(response.data);
        } catch (error) {
            alert('Error in repayment');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove the token on logout
        navigate('/customer-login'); // Redirect to the login page
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <h2>Welcome to Your Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>

            <h3>Your Loans</h3>
            <div>
                {loans.length === 0 ? (
                    <p>No loans found</p>
                ) : (
                    <ul>
                        {loans.map((loan) => (
                            <li key={loan._id}>
                                <h4>Loan Amount: ${loan.amount}</h4>
                                <p>Term: {loan.term} months</p>
                                <p>Status: {loan.state}</p>
                                <h5>Repayments</h5>
                                <ul>
                                    {loan.repayments.map((repayment) => (
                                        <li key={repayment._id}>
                                            <p>Due Date: {new Date(repayment.dueDate).toLocaleDateString()}</p>
                                            <p>Amount Due: ${repayment.amount}</p>
                                            <p>Status: {repayment.status}</p>
                                            {repayment.status === 'PENDING' && (
                                                <button
                                                    onClick={() =>
                                                        handleRepay(loan._id, repayment._id)
                                                    }
                                                >
                                                    Repay
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Customerdashboard;
