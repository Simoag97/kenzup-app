import React from 'react';
import HomeHeader from '../components/home/HomeHeader';
import PointsCard from '../components/home/PointsCard';
import VerificationBanner from '../components/home/VerificationBanner';
import PromoBanner from '../components/home/PromoBanner';
import ActionGrid from '../components/home/ActionGrid';

const Home = () => {
    return (
        <div style={{
            backgroundColor: '#f8fafc',
            minHeight: 'calc(100vh - 100px)',
            paddingBottom: '20px'
        }}>
            <HomeHeader />
            <PointsCard />
            <VerificationBanner />
            <PromoBanner />
            <ActionGrid />
        </div>
    );
};

export default Home;
