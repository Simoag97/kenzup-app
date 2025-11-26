import React, { useState } from 'react';
import { X, Mail, Phone, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Verification = ({ onClose }) => {
    const [step, setStep] = useState('choose'); // 'choose', 'code'
    const [method, setMethod] = useState(''); // 'email' or 'phone'
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [sentCode, setSentCode] = useState(''); // For testing
    const { refreshPoints, user } = useAuth();

    const handleSendCode = async (selectedMethod) => {
        setLoading(true);
        setError('');
        setMethod(selectedMethod);

        try {
            const response = await api.post('/verification/send', { method: selectedMethod });

            if (response.data.success) {
                setStep('code');
                setSuccess(`Code sent to your ${selectedMethod}`);
                // For testing - remove in production
                if (response.data.code) {
                    setSentCode(response.data.code);
                    console.log('Verification code:', response.data.code);
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send code');
        } finally {
            setLoading(false);
        }
    };

    const handleCodeChange = (index, value) => {
        if (value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            document.getElementById(`code-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            document.getElementById(`code-${index - 1}`)?.focus();
        }
    };

    const handleVerify = async () => {
        const enteredCode = code.join('');

        if (enteredCode.length !== 6) {
            setError('Please enter the complete code');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await api.post('/verification/verify', { code: enteredCode });

            if (response.data.success) {
                setSuccess('Account verified successfully!');
                await refreshPoints();
                setTimeout(() => {
                    onClose();
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid code');
            setCode(['', '', '', '', '', '']);
            document.getElementById('code-0')?.focus();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '32px',
                maxWidth: '400px',
                width: '100%',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
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

                {step === 'choose' && (
                    <>
                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#1e1b4b',
                            marginBottom: '8px',
                            textAlign: 'center'
                        }}>
                            Verify Your Account
                        </h2>

                        <p style={{
                            fontSize: '14px',
                            color: '#64748b',
                            textAlign: 'center',
                            marginBottom: '32px'
                        }}>
                            Choose how you'd like to receive your verification code
                        </p>

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

                        <button
                            onClick={() => handleSendCode('email')}
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '16px',
                                backgroundColor: 'white',
                                border: '2px solid #e2e8f0',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                marginBottom: '12px',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => !loading && (e.currentTarget.style.borderColor = '#4338ca')}
                            onMouseLeave={(e) => !loading && (e.currentTarget.style.borderColor = '#e2e8f0')}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                backgroundColor: '#dbeafe',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Mail size={24} color="#4338ca" />
                            </div>
                            <div style={{ flex: 1, textAlign: 'left' }}>
                                <div style={{ fontWeight: '600', color: '#1e1b4b', marginBottom: '4px' }}>
                                    Email Verification
                                </div>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>
                                    {user?.email}
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => handleSendCode('phone')}
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '16px',
                                backgroundColor: 'white',
                                border: '2px solid #e2e8f0',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => !loading && (e.currentTarget.style.borderColor = '#4338ca')}
                            onMouseLeave={(e) => !loading && (e.currentTarget.style.borderColor = '#e2e8f0')}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                backgroundColor: '#dcfce7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Phone size={24} color="#16a34a" />
                            </div>
                            <div style={{ flex: 1, textAlign: 'left' }}>
                                <div style={{ fontWeight: '600', color: '#1e1b4b', marginBottom: '4px' }}>
                                    SMS Verification
                                </div>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>
                                    {user?.phone}
                                </div>
                            </div>
                        </button>
                    </>
                )}

                {step === 'code' && (
                    <>
                        <button
                            onClick={() => setStep('choose')}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#4338ca',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '16px',
                                fontWeight: '500'
                            }}
                        >
                            <ArrowLeft size={20} />
                            Back
                        </button>

                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#1e1b4b',
                            marginBottom: '8px',
                            textAlign: 'center'
                        }}>
                            Enter Code
                        </h2>

                        <p style={{
                            fontSize: '14px',
                            color: '#64748b',
                            textAlign: 'center',
                            marginBottom: '32px'
                        }}>
                            We sent a 6-digit code to your {method}
                        </p>

                        {sentCode && (
                            <div style={{
                                backgroundColor: '#fef3c7',
                                color: '#92400e',
                                padding: '12px',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                fontSize: '13px',
                                textAlign: 'center'
                            }}>
                                <strong>Test Code:</strong> {sentCode}
                            </div>
                        )}

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

                        {success && (
                            <div style={{
                                backgroundColor: '#dcfce7',
                                color: '#166534',
                                padding: '12px',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                fontSize: '14px',
                                textAlign: 'center'
                            }}>
                                {success}
                            </div>
                        )}

                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            justifyContent: 'center',
                            marginBottom: '24px'
                        }}>
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    style={{
                                        width: '48px',
                                        height: '56px',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '12px',
                                        fontSize: '24px',
                                        fontWeight: '700',
                                        textAlign: 'center',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#4338ca'}
                                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleVerify}
                            disabled={loading || code.join('').length !== 6}
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: loading || code.join('').length !== 6 ? '#94a3b8' : '#4338ca',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: loading || code.join('').length !== 6 ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            {loading ? 'Verifying...' : 'Verify Account'}
                        </button>

                        <button
                            onClick={() => handleSendCode(method)}
                            disabled={loading}
                            style={{
                                width: '100%',
                                marginTop: '12px',
                                padding: '12px',
                                background: 'none',
                                border: 'none',
                                color: '#4338ca',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Resend Code
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Verification;
