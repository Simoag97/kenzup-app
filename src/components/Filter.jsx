import React from 'react';
import { ArrowDownUp } from 'lucide-react';

const Filter = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '24px 0 10px',
        }}>
            <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--primary-blue)',
                fontSize: '14px',
                fontWeight: '500'
            }}>
                <ArrowDownUp size={16} />
                <span>Filters: All</span>
            </button>
        </div>
    );
};

export default Filter;
