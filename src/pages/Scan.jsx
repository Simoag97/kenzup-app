import React, { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { shopAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ScanLine, CheckCircle, XCircle, Camera } from 'lucide-react';

const Scan = () => {
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const { refreshPoints } = useAuth();
    const [html5QrCode, setHtml5QrCode] = useState(null);

    useEffect(() => {
        if (scanning) {
            const qrCode = new Html5Qrcode("qr-reader");
            setHtml5QrCode(qrCode);

            qrCode.start(
                { facingMode: "environment" }, // Use back camera
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }
                },
                onScanSuccess,
                onScanError
            ).catch(err => {
                setError("Camera access denied. Please allow camera permissions.");
                setScanning(false);
            });

            return () => {
                if (qrCode.isScanning) {
                    qrCode.stop().catch(console.error);
                }
            };
        }
    }, [scanning]);

    const onScanSuccess = async (decodedText) => {
        if (html5QrCode && html5QrCode.isScanning) {
            html5QrCode.stop();
        }
        setScanning(false);
        setError('');

        try {
            const response = await shopAPI.redeemToken(decodedText);

            if (response.data.success) {
                setResult(response.data.data);
                await refreshPoints();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to redeem QR code');
        }
    };

    const onScanError = (err) => {
        // Ignore scan errors (they happen frequently during scanning)
    };

    const handleStartScan = () => {
        setScanning(true);
        setResult(null);
        setError('');
    };

    const handleReset = () => {
        if (html5QrCode && html5QrCode.isScanning) {
            html5QrCode.stop();
        }
        setScanning(false);
        setResult(null);
        setError('');
    };

    if (result) {
        return (
            <div style={{
                backgroundColor: '#f8fafc',
                minHeight: 'calc(100vh - 100px)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '40px',
                    maxWidth: '400px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: '#dcfce7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px'
                    }}>
                        <CheckCircle size={48} color="#16a34a" />
                    </div>

                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#1e1b4b',
                        marginBottom: '8px'
                    }}>
                        Points Added!
                    </h2>

                    <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        marginBottom: '32px'
                    }}>
                        {result.description}
                    </p>

                    <div style={{
                        backgroundColor: '#f1f5f9',
                        padding: '24px',
                        borderRadius: '16px',
                        marginBottom: '24px'
                    }}>
                        <p style={{
                            fontSize: '14px',
                            color: '#64748b',
                            marginBottom: '8px'
                        }}>
                            Points Earned
                        </p>
                        <p style={{
                            fontSize: '48px',
                            fontWeight: '700',
                            color: '#16a34a',
                            margin: '0'
                        }}>
                            +{result.points}
                        </p>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '16px',
                        backgroundColor: '#fef3c7',
                        borderRadius: '12px',
                        marginBottom: '24px'
                    }}>
                        <span style={{ fontSize: '14px', color: '#92400e' }}>
                            Purchase Amount:
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#92400e' }}>
                            {result.amount} DH
                        </span>
                    </div>

                    <button
                        onClick={handleReset}
                        style={{
                            width: '100%',
                            padding: '16px',
                            backgroundColor: '#4338ca',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Scan Another QR Code
                    </button>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                backgroundColor: '#f8fafc',
                minHeight: 'calc(100vh - 100px)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '40px',
                    maxWidth: '400px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: '#fee2e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px'
                    }}>
                        <XCircle size={48} color="#dc2626" />
                    </div>

                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#1e1b4b',
                        marginBottom: '16px'
                    }}>
                        Scan Failed
                    </h2>

                    <p style={{
                        fontSize: '14px',
                        color: '#dc2626',
                        marginBottom: '32px'
                    }}>
                        {error}
                    </p>

                    <button
                        onClick={handleReset}
                        style={{
                            width: '100%',
                            padding: '16px',
                            backgroundColor: '#4338ca',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!scanning) {
        return (
            <div style={{
                backgroundColor: '#f8fafc',
                minHeight: 'calc(100vh - 100px)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '40px',
                    maxWidth: '400px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #4338ca 0%, #3730a3 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        boxShadow: '0 8px 16px rgba(67, 56, 202, 0.3)'
                    }}>
                        <Camera size={60} color="white" />
                    </div>

                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#1e1b4b',
                        marginBottom: '8px'
                    }}>
                        Scan QR Code
                    </h2>

                    <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        marginBottom: '32px'
                    }}>
                        Use your camera to scan the driver's QR code
                    </p>

                    <button
                        onClick={handleStartScan}
                        style={{
                            width: '100%',
                            padding: '16px',
                            backgroundColor: '#4338ca',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#3730a3'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#4338ca'}
                    >
                        Open Camera
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor: '#f8fafc',
            minHeight: 'calc(100vh - 100px)',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '24px',
                maxWidth: '500px',
                margin: '0 auto',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1e1b4b',
                    marginBottom: '16px',
                    textAlign: 'center'
                }}>
                    📷 Position QR Code in Camera
                </h2>

                <div id="qr-reader" style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    width: '100%'
                }}></div>

                <button
                    onClick={handleReset}
                    style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: 'white',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        color: '#64748b',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: '16px'
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Scan;
