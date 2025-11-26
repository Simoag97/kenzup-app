import React from 'react';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import Banner from '../components/Banner';
import Filter from '../components/Filter';
import TransactionList from '../components/TransactionList';

const History = () => {
    return (
        <div style={{
            backgroundColor: '#f8fafc',
            minHeight: 'calc(100vh - 100px)'
        }}>
            <Header title="History" />
            <Tabs />
            <Banner />
            <Filter />
            <TransactionList />
        </div>
    );
};

export default History;
