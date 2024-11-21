import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoanList = ({ user }) => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('/api/loans', {
                    headers: { Authorization: user.token },
                });
                setLoans(response.data);
            } catch (err) {
                console.error('Error fetching loans');
            }
        };
        fetchLoans();
    }, [user]);

    return (
        <div>
            <h3>Your Loans</h3>
            <ul>
                {loans.map((loan) => (
                    <li key={loan._id}>
                        Amount: {loan.amount}, Term: {loan.term} weeks, Status: {loan.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LoanList;
