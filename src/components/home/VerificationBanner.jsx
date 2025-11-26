import React, { useState } from 'react';
import { ChevronRight, BadgeCheck } from 'lucide-react';
import Verification from '../Verification';

const VerificationBanner = () => {
    const [showVerification, setShowVerification] = useState(false);

    return (
        <>
            <div
                onClick={() => setShowVerification(true)}
                style={{
                    background: 'linear-gradient(90deg, #fde047 0%, #facc15 100%)',
                    padding: '16px 20px',
                    margin: '0 16px 16px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(253, 224, 71, 0.3)'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <BadgeCheck size={24} color="white" />
                        <div style={{
                            position: 'absolute',
                            bottom: '-4px',
                            right: '-4px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#ef4444',
                            border: '2px solid white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: 'white'
                        }}>
                            !
                        </div>
                    </div>

                    <div>
                        <h3 style={{
                            fontSize: '15px',
                            fontWeight: '700',
                            color: '#1e1b4b',
                            marginBottom: '2px'
                        }}>
                            Verify your account
                        </h3>
                        <p style={{
                            fontSize: '12px',
                            color: '#1e1b4b',
                            opacity: 0.7
                        }}>
                            Verify your account to unlock more rewards
                        </p>
                    </div>
                </div>

                <ChevronRight size={24} color="#1e1b4b" />
            </div>

            {showVerification && (
                <Verification onClose={() => setShowVerification(false)} />
            )}
        </>
    );
};

export default VerificationBanner;
