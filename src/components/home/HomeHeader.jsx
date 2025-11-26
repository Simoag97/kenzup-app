import React from 'react';
import { Bell, Headphones } from 'lucide-react';

const HomeHeader = () => {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            backgroundColor: 'white',
            borderBottom: '1px solid var(--border-color)',
        }}>
            <div style={{
                backgroundColor: '#1e1b4b',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '16px',
                fontStyle: 'italic'
            }}>
                Kenz'up
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{ color: 'var(--primary-dark)' }}>
                    <Bell size={22} />
                </button>
                <button style={{ color: 'var(--primary-dark)' }}>
                    <Headphones size={22} />
                </button>
            </div>
        </header>
    );
};

export default HomeHeader;
