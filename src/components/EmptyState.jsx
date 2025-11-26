import React from 'react';
import boxImage from '../assets/box.png';

const EmptyState = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            textAlign: 'center'
        }}>
            <img
                src={boxImage}
                alt="No transactions"
                style={{
                    width: '180px',
                    height: 'auto',
                    marginBottom: '24px',
                    objectFit: 'contain'
                }}
            />
            <h2 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--primary-dark)',
                marginBottom: '12px'
            }}>
                No transactions yet
            </h2>
            <p style={{
                fontSize: '13px',
                color: '#1e1b4b',
                lineHeight: '1.5',
                maxWidth: '300px',
                fontWeight: '500'
            }}>
                Once you start paying with Kenz'up, they will appear here.
            </p>
        </div>
    );
};

export default EmptyState;
