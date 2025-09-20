import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import ChatInterface from '../components/ChatInterface';
import Globe3D from '../components/Globe3D';
import DataVisualization from '../components/DataVisualization';
import FutureScope from '../components/FutureScope';
import SmartDiscovery from '../components/SmartDiscovery';
import LearningMode from '../components/LearningMode';
import LatestNews from '../components/LatestNews';
import PolicyHub from '../components/PolicyHub';
import ResearchHub from '../components/ResearchHub';
import Livebooks from './Livebooks';

const LandingPage = () => {
  const [currentView, setCurrentView] = useState('home');
  const [chartType, setChartType] = useState('temperature');
  const [showChatModal, setShowChatModal] = useState(false);
  
  // Smart Discovery filters state
  const [filters, setFilters] = useState({
    regions: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean', 'Southern Ocean'],
    parameters: ['temperature', 'salinity', 'depth', 'currents'],
    timeRange: '30d',
    temperatureRange: [-2, 35],
    salinityRange: [30, 40],
    advancedFilters: {
      depthRange: [0, 2000],
      dataQuality: 'all',
      floatStatus: 'all'
    }
  });

  // Sample float data (in real app, this would come from API)
  const allFloatData = useMemo(() => [
    { id: 'ARG001', lat: 20.5, lng: 78.9, temp: 26.8, salinity: 35.2, depth: 150, status: 'active', region: 'Indian Ocean', lastUpdate: '2024-01-15' },
    { id: 'ARG002', lat: 15.3, lng: 73.2, temp: 28.1, salinity: 35.0, depth: 200, status: 'active', region: 'Indian Ocean', lastUpdate: '2024-01-14' },
    { id: 'ARG003', lat: 25.1, lng: 82.4, temp: 25.9, salinity: 35.4, depth: 180, status: 'active', region: 'Indian Ocean', lastUpdate: '2024-01-13' },
    { id: 'ARG004', lat: 12.8, lng: 75.7, temp: 29.2, salinity: 34.8, depth: 120, status: 'transmitting', region: 'Indian Ocean', lastUpdate: '2024-01-12' },
    { id: 'ARG005', lat: 22.4, lng: 88.1, temp: 27.3, salinity: 35.1, depth: 160, status: 'active', region: 'Indian Ocean', lastUpdate: '2024-01-11' },
    { id: 'PAC001', lat: 35.2, lng: 139.7, temp: 22.1, salinity: 34.7, depth: 300, status: 'active', region: 'Pacific Ocean', lastUpdate: '2024-01-10' },
    { id: 'PAC002', lat: 33.8, lng: 151.2, temp: 21.8, salinity: 34.9, depth: 250, status: 'active', region: 'Pacific Ocean', lastUpdate: '2024-01-09' },
    { id: 'PAC003', lat: 21.3, lng: -157.8, temp: 26.4, salinity: 35.2, depth: 180, status: 'transmitting', region: 'Pacific Ocean', lastUpdate: '2024-01-08' },
    { id: 'ATL001', lat: 40.7, lng: -74.0, temp: 18.3, salinity: 35.8, depth: 400, status: 'active', region: 'Atlantic Ocean', lastUpdate: '2024-01-07' },
    { id: 'ATL002', lat: 51.5, lng: -0.1, temp: 15.2, salinity: 35.1, depth: 350, status: 'active', region: 'Atlantic Ocean', lastUpdate: '2024-01-06' },
    { id: 'ATL003', lat: 25.7, lng: -80.2, temp: 24.9, salinity: 36.0, depth: 220, status: 'transmitting', region: 'Atlantic Ocean', lastUpdate: '2024-01-05' },
    { id: 'ARC001', lat: 75.2, lng: -120.5, temp: -1.8, salinity: 32.5, depth: 100, status: 'active', region: 'Arctic Ocean', lastUpdate: '2024-01-04' },
    { id: 'ARC002', lat: 78.9, lng: 15.3, temp: -1.5, salinity: 32.8, depth: 80, status: 'active', region: 'Arctic Ocean', lastUpdate: '2024-01-03' },
    { id: 'SO001', lat: -65.2, lng: 45.7, temp: 2.1, salinity: 34.2, depth: 500, status: 'active', region: 'Southern Ocean', lastUpdate: '2024-01-02' },
    { id: 'SO002', lat: -68.4, lng: -120.8, temp: 1.8, salinity: 34.0, depth: 450, status: 'transmitting', region: 'Southern Ocean', lastUpdate: '2024-01-01' }
  ], []);

  // Apply filters to float data
  const filteredFloatData = useMemo(() => {
    return allFloatData.filter(float => {
      // Region filter
      if (!filters.regions.includes(float.region)) return false;
      
      // Temperature range filter
      if (float.temp < filters.temperatureRange[0] || float.temp > filters.temperatureRange[1]) return false;
      
      // Salinity range filter  
      if (float.salinity < filters.salinityRange[0] || float.salinity > filters.salinityRange[1]) return false;
      
      // Depth range filter
      if (float.depth < filters.advancedFilters.depthRange[0] || float.depth > filters.advancedFilters.depthRange[1]) return false;
      
      // Float status filter
      if (filters.advancedFilters.floatStatus !== 'all' && float.status !== filters.advancedFilters.floatStatus) return false;
      
      // Time range filter (simplified - in real app would use actual dates)
      const daysSinceUpdate = Math.floor(Math.random() * 30); // Simulated
      const maxDays = filters.timeRange === '7d' ? 7 : filters.timeRange === '30d' ? 30 : filters.timeRange === '90d' ? 90 : 365;
      if (daysSinceUpdate > maxDays) return false;
      
      return true;
    });
  }, [allFloatData, filters]);

  const renderCurrentView = () => {
    switch(currentView) {
      case 'charts':
        return (
          <div className="charts-page">
            <div className="charts-header">
              <h2 className="section-title">Ocean Data Analytics</h2>
              <div className="chart-controls">
                <button 
                  className={`chart-btn ${chartType === 'temperature' ? 'active' : ''}`}
                  onClick={() => setChartType('temperature')}
                >
                  Temperature Trends
                </button>
                <button 
                  className={`chart-btn ${chartType === 'salinity' ? 'active' : ''}`}
                  onClick={() => setChartType('salinity')}
                >
                  Salinity Profiles
                </button>
              </div>
            </div>
            <div className="charts-container">
              <DataVisualization type={chartType} />
            </div>
          </div>
        );
      case 'discovery':
        return (
          <SmartDiscovery 
            filters={filters}
            onFiltersChange={setFilters}
            floatData={filteredFloatData}
          />
        );
      case 'future':
        return <FutureScope onNavigateToLivebooks={() => setCurrentView('livebooks')} />;
      case 'livebooks':
        return <Livebooks />;
      case 'news':
        return <LatestNews />;
      case 'policy':
        return <PolicyHub />;
      case 'research':
        return <ResearchHub />;
      case 'learning':
        return <LearningMode />;
      default:
        return renderHomeContent();
    }
  };

  const renderHomeContent = () => (
    <div className="home-content">
      {/* Header Section */}
      <header className="hero-section fade-in-up">
        <div className="logo-section animate-float">
          <div className="logo-icon">🌊</div>
          <h1 className="main-title">FloatChat</h1>
        </div>
        
        <div className="subtitle-section slide-in-left">
          <h2 className="tagline">AI Powered Ocean Data Assistant</h2>
          <p className="description">
            "Ask anything about the oceans, get instant insights & visuals"
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="action-buttons slide-in-right">
          <button 
            className="cta-button primary"
            onClick={() => setCurrentView('home')}
          >
            Start Exploring 🚀
          </button>
          <button 
            className="cta-button secondary"
            onClick={() => setCurrentView('discovery')}
          >
            Smart Discovery 🔍
          </button>
          <button 
            className="cta-button secondary"
            onClick={() => setCurrentView('charts')}
          >
            View Charts 📊
          </button>
        </div>
      </header>

      {/* Dashboard Section */}
      <div className="dashboard-section">
        <div className="ocean-explorer-container">
          {/* Ocean Explorer - Full Width */}
          <div className="dashboard-card ocean-explorer-card glass">
            <div className="card-header">
              <h3>🗺️ Ocean Explorer</h3>
              <span className="float-count">2,847 Active Floats</span>
            </div>
            <Globe3D floatData={filteredFloatData} />
          </div>

          {/* Quick Stats */}
          <div className="dashboard-card stats-card glass">
            <div className="card-header">
              <h3>📈 Live Ocean Data</h3>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value ocean-text">24.5°C</div>
                <div className="stat-label">Avg Temperature</div>
              </div>
              <div className="stat-item">
                <div className="stat-value ocean-text">35.2‰</div>
                <div className="stat-label">Salinity</div>
              </div>
              <div className="stat-item">
                <div className="stat-value ocean-text">1,024 m</div>
                <div className="stat-label">Avg Depth</div>
              </div>
              <div className="stat-item">
                <div className="stat-value ocean-text">2.1 m/s</div>
                <div className="stat-label">Current Speed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="features-section">
        <h2 className="section-title">Explore Ocean Intelligence</h2>
        <div className="features-grid">
          <div className="feature-card glass">
            <div className="feature-icon">🤖</div>
            <h3>AI Chat Interface</h3>
            <p>Natural language queries for complex ocean data analysis</p>
          </div>
          <div 
            className="feature-card glass clickable"
            onClick={() => setCurrentView('discovery')}
          >
            <div className="feature-icon">🔍</div>
            <h3>Smart Discovery</h3>
            <p>Region, parameter, and time-based data filtering</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">📊</div>
            <h3>Dynamic Visualization</h3>
            <p>Interactive charts, maps, and 3D ocean profiles</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">🧠</div>
            <h3>Deep Insights</h3>
            <p>AI-powered trend analysis and predictions</p>
          </div>
        </div>
        <div className="features-cta">
          <button 
            className="cta-button primary"
            onClick={() => setCurrentView('future')}
          >
            View Future Impact 🚀
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="main-nav glass">
        <div className="nav-brand">
          <span className="nav-logo">🌊</span>
          <span className="nav-title">FloatChat</span>
        </div>
        <div className="nav-links">
          <button 
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentView('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentView === 'discovery' ? 'active' : ''}`}
            onClick={() => setCurrentView('discovery')}
          >
            Smart Discovery
          </button>
          <button 
            className={`nav-link ${currentView === 'charts' ? 'active' : ''}`}
            onClick={() => setCurrentView('charts')}
          >
            Analytics
          </button>
          <button 
            className={`nav-link ${currentView === 'future' ? 'active' : ''}`}
            onClick={() => setCurrentView('future')}
          >
            Future Vision
          </button>
          <Link to="/about" className="nav-link about-link">
            <span className="nav-icon">👥</span>
            About Us
          </Link>
        </div>
      </nav>

      {/* Secondary Navigation for New Features */}
      <div className="secondary-nav">
        <div className="secondary-nav-container">
          <div className="quick-access-title">
            <span className="title-icon">⚡</span>
            Quick Access
          </div>
          <div className="quick-links">
            <button 
              className="quick-link"
              onClick={() => setCurrentView('news')}
              title="Latest oceanographic news and discoveries"
            >
              <span className="quick-icon">📰</span>
              <span className="quick-text">Latest News</span>
            </button>
            <button 
              className="quick-link"
              onClick={() => setCurrentView('policy')}
              title="Maritime policies and regulations"
            >
              <span className="quick-icon">📋</span>
              <span className="quick-text">Policy Hub</span>
            </button>
            <button 
              className="quick-link"
              onClick={() => setCurrentView('research')}
              title="Research projects and publications"
            >
              <span className="quick-icon">🔬</span>
              <span className="quick-text">Research Hub</span>
            </button>
            <button 
              className="quick-link"
              onClick={() => setCurrentView('learning')}
              title="Ocean data programming tutorials"
            >
              <span className="quick-icon">💻</span>
              <span className="quick-text">Learn Coding</span>
            </button>
          </div>
        </div>
      </div>

      {/* Animated Background */}
      <div className="bg-animation">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderCurrentView()}
      </div>

      {/* Floating Action Button */}
      <button 
        className="fab glass animate-pulse" 
        onClick={() => setShowChatModal(true)}
        title="Ask FloatChat"
      >
        <span className="fab-icon">💭</span>
      </button>

      {/* Chat Modal */}
      {showChatModal && (
        <div className="chat-modal-overlay" onClick={() => setShowChatModal(false)}>
          <div className="chat-modal glass" onClick={(e) => e.stopPropagation()}>
            <div className="chat-modal-header">
              <div className="modal-title">
                <span className="modal-icon">💬</span>
                Ask FloatChat
              </div>
              <button 
                className="close-btn"
                onClick={() => setShowChatModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="chat-modal-content">
              <ChatInterface />
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <p className="newsletter-update-text">Get updated</p>
        <h1 className="newsletter-title">Subscribe to our newsletter & get the latest ocean news</h1>
        <div className="newsletter-form-wrapper">
          <input 
            type="email" 
            className="newsletter-input" 
            placeholder="Enter your email address"
          />
          <button className="newsletter-button">
            Subscribe now
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="main-footer">
        <div className="footer-content-wrapper">
          <div className="footer-brand">
            <svg width="31" height="34" viewBox="0 0 31 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m8.75 5.3 6.75 3.884 6.75-3.885M8.75 28.58v-7.755L2 16.939m27 0-6.75 3.885v7.754M2.405 9.408 15.5 16.954l13.095-7.546M15.5 32V16.939M29 22.915V10.962a2.98 2.98 0 0 0-1.5-2.585L17 2.4a3.01 3.01 0 0 0-3 0L3.5 8.377A3 3 0 0 0 2 10.962v11.953A2.98 2.98 0 0 0 3.5 25.5L14 31.477a3.01 3.01 0 0 0 3 0L27.5 25.5a3 3 0 0 0 1.5-2.585" stroke="url(#floatchat-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="floatchat-gradient" x1="15.5" y1="2" x2="15.5" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00d4ff"/>
                  <stop offset="1" stopColor="#383838"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="footer-sections">
            <div className="footer-section">
              <p className="footer-section-title">Product</p>
              <ul className="footer-links">
                <li><a href="/" className="footer-link">Home</a></li>
                <li><a href="/" className="footer-link">Ocean Explorer</a></li>
                <li><a href="/" className="footer-link">Marine Data</a></li>
                <li><a href="/" className="footer-link">ARGO Floats</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <p className="footer-section-title">Resources</p>
              <ul className="footer-links">
                <li><a href="/" className="footer-link">Documentation</a></li>
                <li><a href="/" className="footer-link">Research Papers</a></li>
                <li><a href="/" className="footer-link">Community</a></li>
                <li><a href="/" className="footer-link">API Access<span className="footer-badge">Beta</span></a></li>
                <li><a href="/" className="footer-link">About</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <p className="footer-section-title">Legal</p>
              <ul className="footer-links">
                <li><a href="/" className="footer-link">Privacy Policy</a></li>
                <li><a href="/" className="footer-link">Terms of Service</a></li>
                <li><a href="/" className="footer-link">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-right">
            <p className="footer-description">Empowering ocean research through AI-powered data insights and global collaboration.</p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
            <p className="footer-copyright">© 2025 FloatChat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;