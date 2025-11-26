import React from 'react';
import { CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PointsCard = () => {
    const { points, user } = useAuth();

    return (
        <div style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
            borderRadius: '20px',
            padding: '32px 24px',
            margin: '16px',
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 8px 16px rgba(255, 107, 107, 0.3)'
        }}>
            <p style={{
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px',
                opacity: 0.95
            }}>
                Points
            </p>

            <h1 style={{
                fontSize: '56px',
                fontWeight: '700',
                margin: '8px 0 24px',
                letterSpacing: '-1px'
            }}>
                {points.toFixed(2)}
            </h1>

            <button style={{
                backgroundColor: 'white',
                color: '#4338ca',
                padding: '12px 32px',
                borderRadius: '24px',
                fontSize: '15px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
            }}>
                <CreditCard size={18} />
                Cash in
            </button>
        </div>
    );
};

export default PointsCard;
