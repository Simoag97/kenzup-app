import React from 'react';
import { Home, ArrowLeftRight, ScanLine, List, User } from 'lucide-react';

const BottomNav = ({ activeTab = 'Home', onNavigate }) => {
    const navItems = [
        { icon: Home, label: 'Home', page: 'Home' },
        { icon: ArrowLeftRight, label: 'Transfer', page: 'Transfer' },
        { icon: ScanLine, label: 'Scan', page: 'Scan', isMain: true },
        { icon: List, label: 'History', page: 'History' },
        { icon: User, label: 'Account', page: 'Account' },
    ];

    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderTop: '1px solid var(--border-color)',
            padding: '8px 0 24px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            height: '80px',
            zIndex: 100
        }}>
            {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeTab === item.page;

                if (item.isMain) {
                    return (
                        <div key={index} style={{
                            position: 'relative',
                            top: '-25px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <button
                                onClick={() => onNavigate && onNavigate(item.page)}
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    backgroundColor: 'white',
                                    border: '4px solid #e0e7ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#1e1b4b',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}
                            >
                                <Icon size={28} strokeWidth={2.5} />
                            </button>
                            <span style={{
                                fontSize: '12px',
                                marginTop: '4px',
                                color: '#94a3b8',
                                fontWeight: '500'
                            }}>{item.label}</span>
                        </div>
                    );
                }

                return (
                    <button
                        key={index}
                        onClick={() => onNavigate && onNavigate(item.page)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            flex: 1,
                            color: isActive ? 'var(--primary-blue)' : '#94a3b8'
                        }}
                    >
                        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        <span style={{
                            fontSize: '11px',
                            fontWeight: '500'
                        }}>{item.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNav;
