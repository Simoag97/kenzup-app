import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { driverAPI } from '../services/api';
import { Package, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Driver = () => {
    const [amount, setAmount] = useState('');
    const [qrData, setQrData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { logout } = useAuth();

    const handleGenerate = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const amountNum = parseFloat(amount);
            if (isNaN(amountNum) || amountNum <= 0) {
                setError('Please enter a valid amount');
                setLoading(false);
                return;
            }

            const response = await driverAPI.generateToken(amountNum, `Purchase: ${amountNum} DH`);

            if (response.data.success) {
                setQrData(response.data.data);
                setAmount('');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate QR code');
        } finally {
            setLoading(false);
        }
    };

    const calculatePoints = (amt) => {
        const num = parseFloat(amt);
        return isNaN(num) ? 0 : Math.floor(num / 100);
    };

    return (
        <div style={{
            backgroundColor: '#f8fafc',
            minHeight: '100vh',
            padding: '20px'
        }}>
            {/* Logout Button - Top Right */}
            <button
                onClick={logout}
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    padding: '10px 16px',
                    backgroundColor: 'white',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    color: '#64748b',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    zIndex: 1000
                }}
                onMouseEnter={(e) => {
                    e.target.style.borderColor = '#dc2626';
                    e.target.style.color = '#dc2626';
                }}
                onMouseLeave={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.color = '#64748b';
                }}
            >
                <LogOut size={18} />
                Logout
            </button>

            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '32px'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4338ca 0%, #3730a3 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    boxShadow: '0 8px 16px rgba(67, 56, 202, 0.3)'
                }}>
                    <Package size={40} color="white" />
                </div>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#1e1b4b',
                    marginBottom: '8px'
                }}>
                    Driver Dashboard
                </h1>
                <p style={{
                    fontSize: '14px',
                    color: '#64748b'
                }}>
                    Generate QR codes for purchases
                </p>
            </div>

            {!qrData ? (
                /* Purchase Entry Form */
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '32px',
                    maxWidth: '400px',
                    margin: '0 auto',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#1e1b4b',
                        marginBottom: '24px',
                        textAlign: 'center'
                    }}>
                        New Purchase
                    </h2>

                    {error && (
                        <div style={{
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '16px',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleGenerate}>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#1e1b4b',
                                marginBottom: '8px'
                            }}>
                                Purchase Amount (DH)
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount in DH"
                                required
                                min="1"
                                step="0.01"
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '12px',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#4338ca'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                        </div>

                        {amount && (
                            <div style={{
                                backgroundColor: '#f1f5f9',
                                padding: '16px',
                                borderRadius: '12px',
                                marginBottom: '24px',
                                textAlign: 'center'
                            }}>
                                <p style={{
                                    fontSize: '13px',
                                    color: '#64748b',
                                    marginBottom: '4px'
                                }}>
                                    Points to be awarded
                                </p>
                                <p style={{
                                    fontSize: '32px',
                                    fontWeight: '700',
                                    color: '#4338ca'
                                }}>
                                    {calculatePoints(amount)}
                                </p>
                                <p style={{
                                    fontSize: '12px',
                                    color: '#64748b',
                                    marginTop: '4px'
                                }}>
                                    (1 point per 100 DH)
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !amount}
                            style={{
                                width: '100%',
                                padding: '16px',
                                backgroundColor: loading || !amount ? '#94a3b8' : '#4338ca',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: loading || !amount ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            {loading ? 'Generating...' : 'Generate QR Code'}
                        </button>
                    </form>
                </div>
            ) : (
                /* QR Code Display */
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '32px',
                    maxWidth: '400px',
                    margin: '0 auto',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    position: 'relative'
                }}>
                    <button
                        onClick={() => setQrData(null)}
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#64748b'
                        }}
                    >
                        <X size={24} />
                    </button>

                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#1e1b4b',
                        marginBottom: '8px'
                    }}>
                        Show this QR Code
                    </h2>
                    <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        marginBottom: '24px'
                    }}>
                        Shop owner will scan to receive points
                    </p>

                    <div style={{
                        backgroundColor: 'white',
                        padding: '24px',
                        borderRadius: '16px',
                        border: '3px solid #4338ca',
                        marginBottom: '24px',
                        display: 'inline-block'
                    }}>
                        <QRCodeSVG
                            value={qrData.token}
                            size={256}
                            level="H"
                            includeMargin={true}
                        />
                    </div>

                    <div style={{
                        backgroundColor: '#f1f5f9',
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '16px'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '12px'
                        }}>
                            <span style={{ color: '#64748b', fontSize: '14px' }}>Amount:</span>
                            <span style={{ color: '#1e1b4b', fontWeight: '600', fontSize: '16px' }}>
                                {qrData.amount} DH
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span style={{ color: '#64748b', fontSize: '14px' }}>Points:</span>
                            <span style={{ color: '#4338ca', fontWeight: '700', fontSize: '20px' }}>
                                {qrData.points}
                            </span>
                        </div>
                    </div>

                    <p style={{
                        fontSize: '12px',
                        color: '#dc2626',
                        marginBottom: '16px'
                    }}>
                        ⏰ Expires in 24 hours
                    </p>

                    <button
                        onClick={() => setQrData(null)}
                        style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: '#4338ca',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Create New QR Code
                    </button>
                </div>
            )}
        </div>
    );
};

export default Driver;
