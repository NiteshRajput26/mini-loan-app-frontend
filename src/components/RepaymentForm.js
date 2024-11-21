import React, { useState } from 'react';
import axios from 'axios';

const RepaymentForm = ({ user, loanId }) => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleRepayment = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/loans/${loanId}/repayments`, { amount }, {
                headers: { Authorization: user.token },
            });
            setMessage('Repayment successful!');
        } catch (err) {
            setMessage('Error processing repayment.');
        }
    };

    return (
        <form onSubmit={handleRepayment}>
            <h3>Make a Repayment</h3>
            <div>
                <label>Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <button type="submit">Submit Repayment</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default RepaymentForm;
