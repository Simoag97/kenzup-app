import React from 'react';
import { ChevronRight, Percent, CreditCard } from 'lucide-react';
import dealsImage from '../../assets/deals_box.png';
import wheelImage from '../../assets/spin_wheel.png';

const ActionCard = ({ title, subtitle, icon, image, bgColor, textColor }) => (
    <div style={{
        backgroundColor: bgColor || 'white',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '160px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div>
            <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: textColor || '#1e1b4b',
                marginBottom: '4px'
            }}>
                {title}
            </h3>
            <p style={{
                fontSize: '12px',
                color: textColor || '#64748b',
                opacity: 0.8,
                lineHeight: '1.4'
            }}>
                {subtitle}
            </p>
        </div>

        {image && (
            <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                width: '80px',
                height: '80px',
                backgroundImage: `url(${image})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }} />
        )}

        {icon && (
            <div style={{
                alignSelf: 'flex-start',
                marginTop: '8px'
            }}>
                {icon}
            </div>
        )}
    </div>
);

const ActionGrid = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            padding: '0 16px 16px',
        }}>
            <ActionCard
                title="Deals"
                subtitle="Earn more points or enjoy discounts"
                image={dealsImage}
                bgColor="#dbeafe"
            />

            <ActionCard
                title="Spin the wheel"
                subtitle="And try winning points everyday !"
                image={wheelImage}
                bgColor="#fef3c7"
            />

            <ActionCard
                title="Add payment card"
                subtitle="Earn extra points on first use"
                icon={<ChevronRight size={32} color="#4338ca" />}
                bgColor="white"
            />

            <ActionCard
                title="Partners"
                subtitle="Discover all the loyalty program partners"
                icon={<ChevronRight size={32} color="#4338ca" />}
                bgColor="white"
            />
        </div>
    );
};

export default ActionGrid;
