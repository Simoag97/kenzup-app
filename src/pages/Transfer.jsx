import React from 'react';
import transferIllustration from '../assets/transfer_illustration.png';

const Transfer = () => {
    return (
        <div style={{
            backgroundColor: '#f8fafc',
            minHeight: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '60px 24px 40px',
            textAlign: 'center'
        }}>
            {/* Top Section with Illustration and Text */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center'
            }}>
                <div style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    backgroundColor: '#e8eaf6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '32px',
                    overflow: 'hidden'
                }}>
                    <img
                        src={transferIllustration}
                        alt="Transfer illustration"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>

                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#1e1b4b',
                    marginBottom: '16px',
                    letterSpacing: '-0.5px'
                }}>
                    Make transfers
                </h1>

                <p style={{
                    fontSize: '15px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    maxWidth: '320px'
                }}>
                    Please your loved ones with the transfer
                </p>
            </div>

            {/* Bottom Button */}
            <button style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: '#4f46e5',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '28px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(79, 70, 229, 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s'
            }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 20px rgba(79, 70, 229, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 16px rgba(79, 70, 229, 0.3)';
                }}
            >
                Send to a number
            </button>
        </div>
    );
};

export default Transfer;
