import React from 'react';
import promoImage from '../../assets/promo_fuel.png';
import { Fuel } from 'lucide-react';

const PromoBanner = () => {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
            borderRadius: '16px',
            margin: '0 16px 16px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '120px',
            cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(236, 72, 153, 0.3)'
        }}>
            <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: '#1e1b4b',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.5px'
            }}>
                NEW
            </div>

            <div style={{ flex: 1, paddingRight: '16px' }}>
                <h3 style={{
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '700',
                    lineHeight: '1.3',
                    marginBottom: '8px'
                }}>
                    Manage and justify<br />your fuel expenses
                </h3>
                <Fuel size={32} color="white" style={{ opacity: 0.9 }} />
            </div>

            <div style={{
                width: '140px',
                height: '100px',
                backgroundImage: `url(${promoImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }} />
        </div>
    );
};

export default PromoBanner;
