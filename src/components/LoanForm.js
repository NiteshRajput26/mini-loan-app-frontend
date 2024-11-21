import React, { useState } from 'react';
import axios from 'axios';

const LoanForm = ({ user }) => {
    const [amount, setAmount] = useState('');
    const [term, setTerm] = useState('');
    const [message, setMessage] = useState('');

    const submitLoanRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/loans', { amount, term }, {
                headers: { Authorization: user.token },
            });
            setMessage(`Loan Request Created: ${response.data._id}`);
        } catch (err) {
            setMessage('Error submitting loan request.');
        }
    };

    return (
        <form onSubmit={submitLoanRequest}>
            <h3>Apply for a Loan</h3>
            <div>
                <label>Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div>
                <label>Term (weeks):</label>
                <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} required />
            </div>
            <button type="submit">Submit Loan</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default LoanForm;
