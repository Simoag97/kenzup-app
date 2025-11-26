import React, { useState } from 'react';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('Transactions');

    const tabStyle = (isActive) => ({
        flex: 1,
        textAlign: 'center',
        padding: '16px 0',
        fontSize: '15px',
        fontWeight: '500',
        color: isActive ? 'var(--primary-dark)' : 'var(--text-secondary)',
        borderBottom: isActive ? '3px solid #ff5722' : '1px solid transparent', // Orange underline for active
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s ease'
    });

    return (
        <div style={{
            display: 'flex',
            backgroundColor: 'white',
            borderBottom: '1px solid var(--border-color)'
        }}>
            <div
                style={tabStyle(activeTab === 'Transactions')}
                onClick={() => setActiveTab('Transactions')}
            >
                Transactions
            </div>
            <div
                style={tabStyle(activeTab === 'Notifications')}
                onClick={() => setActiveTab('Notifications')}
            >
                Notifications
            </div>
        </div>
    );
};

export default Tabs;
