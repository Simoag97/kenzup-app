import React from 'react';
import { ChevronRight, FileText } from 'lucide-react';

const Banner = () => {
    return (
        <div style={{
            background: 'linear-gradient(90deg, #4ade80 0%, #22c55e 100%)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'var(--primary-dark)',
            cursor: 'pointer'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Logo Placeholder */}
                <div style={{
                    display: 'flex',
                    position: 'relative',
                    width: '48px',
                    height: '32px'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        zIndex: 2
                    }}>
                        <FileText size={16} color="#4ade80" />
                    </div>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        marginLeft: '-12px',
                        zIndex: 1
                    }}>
                        <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#f59e0b' }}>D</span>
                    </div>
                </div>

                <p style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    lineHeight: '1.4',
                    color: '#1e1b4b',
                    opacity: 0.8
                }}>
                    Download your gas consumption<br />statement
                </p>
            </div>
            <ChevronRight size={20} color="#1e1b4b" style={{ opacity: 0.6 }} />
        </div>
    );
};

export default Banner;
