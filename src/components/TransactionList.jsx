import React, { useState, useEffect } from 'react';
import { transactionsAPI } from '../services/api';
import { ArrowUpRight, ArrowDownLeft, CreditCard, TrendingUp } from 'lucide-react';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const response = await transactionsAPI.getAll();
            if (response.data.success) {
                setTransactions(response.data.data);
            }
        } catch (error) {
            console.error('Error loading transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTransactionIcon = (type) => {
        switch (type) {
            case 'earn':
            case 'transfer_in':
                return <TrendingUp size={20} color="#16a34a" />;
            case 'spend':
            case 'cash_in':
            case 'transfer_out':
                return <ArrowUpRight size={20} color="#dc2626" />;
            default:
                return <CreditCard size={20} color="#64748b" />;
        }
    };

    const getTransactionColor = (type) => {
        switch (type) {
            case 'earn':
            case 'transfer_in':
                return '#16a34a';
            case 'spend':
            case 'cash_in':
            case 'transfer_out':
                return '#dc2626';
            default:
                return '#64748b';
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (d.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (d.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    };

    if (loading) {
        return (
            <div style={{
                padding: '40px',
                textAlign: 'center',
                color: '#64748b'
            }}>
                Loading transactions...
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div style={{
                padding: '40px 20px',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                }}>
                    <CreditCard size={32} color="#94a3b8" />
                </div>
                <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e1b4b',
                    marginBottom: '8px'
                }}>
                    No transactions yet
                </h3>
                <p style={{
                    fontSize: '14px',
                    color: '#64748b'
                }}>
                    Your purchase history will appear here
                </p>
            </div>
        );
    }

    return (
        <div style={{ padding: '0 16px 16px' }}>
            {transactions.map((transaction) => (
                <div
                    key={transaction._id}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                >
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: `${getTransactionColor(transaction.type)}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {getTransactionIcon(transaction.type)}
                    </div>

                    <div style={{ flex: 1 }}>
                        <h4 style={{
                            fontSize: '15px',
                            fontWeight: '600',
                            color: '#1e1b4b',
                            marginBottom: '4px'
                        }}>
                            {transaction.description}
                        </h4>
                        <p style={{
                            fontSize: '13px',
                            color: '#64748b'
                        }}>
                            {formatDate(transaction.createdAt)}
                        </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <p style={{
                            fontSize: '16px',
                            fontWeight: '700',
                            color: getTransactionColor(transaction.type)
                        }}>
                            {transaction.type === 'earn' || transaction.type === 'transfer_in' ? '+' : '-'}
                            {transaction.amount}
                        </p>
                        <p style={{
                            fontSize: '12px',
                            color: '#64748b'
                        }}>
                            points
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TransactionList;
