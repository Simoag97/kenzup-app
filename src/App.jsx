import React, { useState } from 'react';
import Home from './pages/Home';
import History from './pages/History';
import Transfer from './pages/Transfer';
import Account from './pages/Account';
import Scan from './pages/Scan';
import Driver from './pages/Driver';
import Auth from './pages/Auth';
import BottomNav from './components/BottomNav';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('Home');

  // If user is a driver, show driver interface
  if (user && user.role === 'driver') {
    return <Driver />;
  }

  // Shop owner interface (existing)
  // Shop owner interface (existing)
  const renderPage = () => {
    switch (activeTab) {
      case 'Home':
        return <Home />;
      case 'History':
        return <History />;
      case 'Transfer':
        return <Transfer />;
      case 'Scan':
        return <Scan />;
      case 'Account':
        return <Account />;
      default:
        return <Home />;
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          fontSize: '18px',
          color: '#4338ca',
          fontWeight: '600'
        }}>Loading...</div>
      </div>
    );
  }

  // Show Auth page if not logged in
  if (!user) {
    return <Auth />;
  }

  return (
    <div style={{
      maxWidth: '480px',
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      position: 'relative',
      paddingBottom: '100px',
      boxShadow: '0 0 20px rgba(0,0,0,0.05)'
    }}>
      {renderPage()}
      <BottomNav activeTab={activeTab} onNavigate={setActiveTab} />
    </div>
  );
}

export default App;
