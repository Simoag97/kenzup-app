import React from 'react';
import { RefreshCw } from 'lucide-react';

const Header = () => {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            backgroundColor: 'white',
            borderBottom: '1px solid var(--border-color)',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            <div style={{ width: 24 }}></div> {/* Spacer for centering */}
            <h1 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--primary-dark)'
            }}>History</h1>
            <button style={{ color: 'var(--primary-blue)' }}>
                <RefreshCw size={20} />
            </button>
        </header>
    );
};

export default Header;
