import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Award, CheckCircle, XCircle, LogOut } from 'lucide-react';

const Account = () => {
    const { user, points, logout } = useAuth();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
        }
    };

    return (
        <div style={{
            backgroundColor: '#f8fafc',
            minHeight: 'calc(100vh - 100px)',
            padding: '20px'
        }}>
            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '24px'
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
                    <User size={40} color="white" />
                </div>
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1e1b4b',
                    marginBottom: '4px'
                }}>
                    {user?.name}
                </h1>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: user?.verified ? '#16a34a' : '#dc2626'
                }}>
                    {user?.verified ? (
                        <>
                            <CheckCircle size={16} />
                            <span>Verified Account</span>
                        </>
                    ) : (
                        <>
                            <XCircle size={16} />
                            <span>Not Verified</span>
                        </>
                    )}
                </div>
            </div>

            {/* Points Card */}
            <div style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '16px',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 8px 16px rgba(255, 107, 107, 0.3)'
            }}>
                <Award size={32} style={{ margin: '0 auto 12px' }} />
                <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
                    Total Points
                </p>
                <h2 style={{ fontSize: '48px', fontWeight: '700', margin: 0 }}>
                    {points.toFixed(2)}
                </h2>
            </div>

            {/* Info Cards */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
                <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1e1b4b',
                    marginBottom: '16px'
                }}>
                    Account Information
                </h3>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 0',
                    borderBottom: '1px solid #e2e8f0'
                }}>
                    <Mail size={20} color="#64748b" />
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Email
                        </p>
                        <p style={{ fontSize: '14px', color: '#1e1b4b', fontWeight: '500' }}>
                            {user?.email}
                        </p>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 0'
                }}>
                    <Phone size={20} color="#64748b" />
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Phone
                        </p>
                        <p style={{ fontSize: '14px', color: '#1e1b4b', fontWeight: '500' }}>
                            {user?.phone}
                        </p>
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: 'white',
                    border: '2px solid #ef4444',
                    borderRadius: '12px',
                    color: '#ef4444',
                    fontSize: '16px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#ef4444';
                    e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = '#ef4444';
                }}
            >
                <LogOut size={20} />
                Logout
            </button>
        </div>
    );
};

export default Account;
