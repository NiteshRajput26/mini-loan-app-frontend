import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = ({ user }) => {
    const [loans, setLoans] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('/api/loans/admin', {
                    headers: { Authorization: user.token },
                });
                setLoans(response.data);
            } catch (err) {
                console.error('Error fetching loans');
            }
        };
        fetchLoans();
    }, [user]);

    const approveLoan = async (loanId) => {
        try {
            await axios.patch(`/api/loans/${loanId}/approve`, {}, {
                headers: { Authorization: user.token },
            });
            setMessage('Loan approved successfully!');
            setLoans((prevLoans) =>
                prevLoans.map((loan) =>
                    loan._id === loanId ? { ...loan, status: 'APPROVED' } : loan
                )
            );
        } catch (err) {
            setMessage('Error approving loan.');
        }
    };

    return (
        <div>
            <h3>Admin Dashboard</h3>
            <ul>
                {loans.map((loan) => (
                    <li key={loan._id}>
                        Loan ID: {loan._id}, Amount: {loan.amount}, Term: {loan.term} weeks, 
                        Status: {loan.status}{' '}
                        {loan.status === 'PENDING' && (
                            <button onClick={() => approveLoan(loan._id)}>Approve</button>
                        )}
                    </li>
                ))}
            </ul>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminDashboard;
