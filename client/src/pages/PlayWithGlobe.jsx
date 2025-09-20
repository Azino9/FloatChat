import React, { useState } from 'react';
import Globe3D from '../components/Globe3D';
import './PlayWithGlobe.css';

const PlayWithGlobe = () => {
  const [globeStyle, setGlobeStyle] = useState('hologram');

  return (
    <div className="play-with-globe-page">
      {/* Header */}
      <div className="globe-page-header">
        <h1 className="globe-page-title">🌍 Play with Globe</h1>
        <p className="globe-page-subtitle">
          Interactive 3D Globe with Real-time ARGO Float Data
        </p>
      </div>

      {/* Main Content */}
      <div className="globe-content-container">
        {/* Globe Controls Panel */}
        <div className="globe-controls-panel">
          <div className="control-section">
            <h3>🎮 Globe Style</h3>
            <div className="globe-style-selector">
              <select 
                value={globeStyle} 
                onChange={(e) => setGlobeStyle(e.target.value)}
                className="style-dropdown"
              >
                <option value="hologram">🔮 Hologram Globe</option>
                <option value="solid">🌎 Solid Earth Globe</option>
              </select>
            </div>
          </div>

          <div className="control-section">
            <h3>🕹️ Controls</h3>
            <div className="control-instructions">
              <div className="instruction-item">
                <span className="control-icon">🖱️</span>
                <span>Click & Drag to rotate</span>
              </div>
              <div className="instruction-item">
                <span className="control-icon">⏸️</span>
                <span>Hover to pause auto-rotation</span>
              </div>
              <div className="instruction-item">
                <span className="control-icon">🎯</span>
                <span>Click floats for details</span>
              </div>
            </div>
          </div>

          <div className="control-section">
            <h3>📊 Globe Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">10</div>
                <div className="stat-label">Total Floats</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">7</div>
                <div className="stat-label">Active</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3</div>
                <div className="stat-label">Transmitting</div>
              </div>
            </div>
          </div>

          <div className="control-section">
            <h3>🌊 About ARGO Floats</h3>
            <div className="info-text">
              <p>
                ARGO is a global ocean observing system that provides real-time data 
                about the ocean's temperature, salinity, and currents. These autonomous 
                floats drift with ocean currents and regularly surface to transmit data.
              </p>
              <p>
                Each float can operate for up to 10 years, diving to depths of 2000m 
                and collecting crucial data for climate research and weather prediction.
              </p>
            </div>
          </div>
        </div>

        {/* Globe Display */}
        <div className="globe-display-area">
          <div className="globe-container-wrapper">
            <Globe3D globeStyle={globeStyle} />
          </div>
          
          {/* Globe Info Panel */}
          <div className="globe-info-panel">
            <div className="current-style-indicator">
              <span className="style-label">Current Style:</span>
              <span className={`style-badge ${globeStyle}`}>
                {globeStyle === 'hologram' ? '🔮 Hologram' : '🌎 Solid Earth'}
              </span>
            </div>
            
            <div className="rotation-status">
              <span className="status-indicator active"></span>
              <span>Auto-rotation Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="globe-page-navigation">
        <button 
          className="nav-button home-button"
          onClick={() => window.history.back()}
        >
          ← Back to Home
        </button>
        <button 
          className="nav-button explore-button"
          onClick={() => {
            // Could navigate to data exploration page
            console.log('Navigate to data exploration');
          }}
        >
          Explore Data →
        </button>
      </div>
    </div>
  );
};

export default PlayWithGlobe;