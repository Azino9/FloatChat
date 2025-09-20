import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './DataVisualization_Enhanced.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DataVisualization = ({ type = 'temperature' }) => {
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [dataQuality, setDataQuality] = useState('high');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [currentDataType, setCurrentDataType] = useState(type === 'temperature' ? 'Temperature' : 'Salinity');

  // Live mode update effect
  React.useEffect(() => {
    let interval;
    if (isLiveMode) {
      interval = setInterval(() => {
        setLastUpdate(new Date());
        // Force re-render of data by triggering state update
        setDataQuality(prev => prev === 'high' ? 'excellent' : 'high');
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLiveMode]);

  // Enhanced data with multiple datasets and regions
  const getTemperatureData = () => {
    const baseData = {
      global: [26.8, 27.4, 28.1, 29.3, 28.9, 28.2, 27.1, 26.9, 27.6],
      atlantic: [24.2, 25.1, 26.8, 28.1, 27.8, 26.9, 25.7, 25.2, 26.1],
      pacific: [28.3, 29.1, 30.2, 31.5, 30.8, 29.7, 28.9, 28.5, 29.2],
      indian: [27.1, 27.9, 29.3, 30.8, 30.2, 29.1, 27.8, 27.4, 28.3]
    };

    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [
        {
          label: `${selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)} Ocean SST (°C)`,
          data: isLiveMode ? 
            baseData[selectedRegion].map(val => val + (Math.random() - 0.5) * 0.5) : 
            baseData[selectedRegion],
          borderColor: selectedRegion === 'global' ? '#00d4ff' : 
                      selectedRegion === 'atlantic' ? '#3b82f6' :
                      selectedRegion === 'pacific' ? '#06b6d4' : '#10b981',
          backgroundColor: selectedRegion === 'global' ? 'rgba(0, 212, 255, 0.1)' : 
                          selectedRegion === 'atlantic' ? 'rgba(59, 130, 246, 0.1)' :
                          selectedRegion === 'pacific' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(16, 185, 129, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 8,
          pointBackgroundColor: selectedRegion === 'global' ? '#00d4ff' : 
                               selectedRegion === 'atlantic' ? '#3b82f6' :
                               selectedRegion === 'pacific' ? '#06b6d4' : '#10b981',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
        },
      ],
    };
  };

  const getSalinityData = () => {
    const baseData = {
      global: [34.1, 34.3, 34.6, 34.9, 35.2, 35.4, 35.3, 35.1],
      atlantic: [35.8, 36.1, 36.4, 36.7, 37.0, 37.2, 37.1, 36.9],
      pacific: [33.2, 33.5, 33.8, 34.1, 34.4, 34.6, 34.5, 34.3],
      indian: [34.3, 34.6, 34.9, 35.2, 35.5, 35.7, 35.6, 35.4]
    };

    return {
      labels: ['Surface', '50m', '100m', '200m', '500m', '1000m', '1500m', '2000m'],
      datasets: [
        {
          label: `${selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)} Ocean Salinity (‰)`,
          data: isLiveMode ? 
            baseData[selectedRegion].map(val => val + (Math.random() - 0.5) * 0.1) : 
            baseData[selectedRegion],
          borderColor: selectedRegion === 'global' ? '#0891b2' : 
                      selectedRegion === 'atlantic' ? '#8b5cf6' :
                      selectedRegion === 'pacific' ? '#f59e0b' : '#ef4444',
          backgroundColor: selectedRegion === 'global' ? 'rgba(8, 145, 178, 0.1)' : 
                          selectedRegion === 'atlantic' ? 'rgba(139, 92, 246, 0.1)' :
                          selectedRegion === 'pacific' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 8,
          pointBackgroundColor: selectedRegion === 'global' ? '#0891b2' : 
                               selectedRegion === 'atlantic' ? '#8b5cf6' :
                               selectedRegion === 'pacific' ? '#f59e0b' : '#ef4444',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: isLiveMode ? 750 : 1500,
      easing: 'easeInOutQuart',
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#b3c5d9',
          font: { size: 12, family: 'Inter' },
          padding: 20,
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
        },
      },
      title: {
        display: true,
        text: `${selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)} Ocean ${type === 'temperature' ? 'Temperature Trends' : 'Salinity Profile'}`,
        color: '#ffffff',
        font: { size: 16, weight: 'bold', family: 'Inter' },
        padding: { bottom: 25 },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 20, 25, 0.95)',
        titleColor: '#00d4ff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        borderWidth: 1,
        cornerRadius: 10,
        titleFont: { size: 13, weight: 'bold', family: 'Inter' },
        bodyFont: { size: 12, family: 'Inter' },
        padding: 12,
        displayColors: true,
        callbacks: {
          title: function(context) {
            return `${type === 'temperature' ? '🌡️' : '🧪'} ${context[0].label}`;
          },
          label: function(context) {
            const value = context.parsed.y.toFixed(2);
            const unit = type === 'temperature' ? '°C' : '‰';
            return ` ${context.dataset.label}: ${value}${unit}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(30, 58, 95, 0.3)' },
        ticks: { color: '#b3c5d9', font: { size: 10 } },
      },
      y: {
        grid: { color: 'rgba(30, 58, 95, 0.3)' },
        ticks: {
          color: '#b3c5d9',
          font: { size: 10 },
          callback: function(value) {
            return type === 'temperature' ? value + '°C' : value + '‰';
          },
        },
      },
    },
  };

  const currentData = type === 'temperature' ? getTemperatureData() : getSalinityData();

  return (
    <div className="data-visualization-compact">
      {/* Enhanced Header */}
      <div className="compact-header">
        <div className="header-left">
          <h3 className="chart-title-compact">
            <span className="title-icon">🌊</span>
            {type === 'temperature' ? 'Ocean Temperature Analytics' : 'Ocean Salinity Analytics'}
          </h3>
          <div className="status-compact">
            <span className={`status-dot ${isLiveMode ? 'live' : 'static'}`}></span>
            <span className="status-text">{isLiveMode ? 'Live Data Stream' : 'Historical Data'}</span>
            <div className="data-quality-badge">
              <span className={`quality-dot ${dataQuality}`}></span>
              <span className="quality-text">{dataQuality.toUpperCase()} Quality</span>
            </div>
          </div>
          <div className="update-time">
            <span className="update-label">Last Update:</span>
            <span className="update-value">{lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>
        
        <div className="header-controls">
          <select 
            value={selectedRegion} 
            onChange={(e) => {
              setIsLoading(true);
              setSelectedRegion(e.target.value);
              setTimeout(() => setIsLoading(false), 500);
            }}
            className="compact-select"
            disabled={isLoading}
          >
            <option value="global">🌍 Global Ocean</option>
            <option value="atlantic">🌊 Atlantic</option>
            <option value="pacific">🏔️ Pacific</option>
            <option value="indian">🏝️ Indian Ocean</option>
          </select>
          
          <button 
            className={`live-btn ${isLiveMode ? 'active' : ''}`}
            onClick={() => {
              setIsLiveMode(!isLiveMode);
              setCurrentDataType(type === 'temperature' ? 'Temperature' : 'Salinity');
            }}
            disabled={isLoading}
          >
            <span className={`status-dot ${isLiveMode ? 'live' : 'static'}`}></span>
            {isLiveMode ? 'LIVE' : 'STATIC'}
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-section-compact">
        {isLoading ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '12px'
          }}>
            <div style={{ color: '#00d4ff', fontSize: '1.2rem' }}>
              🌊 Loading {currentDataType} Data...
            </div>
          </div>
        ) : (
          <Line data={currentData} options={chartOptions} />
        )}
      </div>

      {/* Enhanced Statistics */}
      <div className="stats-compact">
        {type === 'temperature' ? (
          <>
            <div className="stat-item enhanced">
              <span className="stat-icon">🌡️</span>
              <span className="stat-label">Current</span>
              <span className="stat-value">{currentData.datasets[0].data[currentData.datasets[0].data.length - 1].toFixed(1)}°C</span>
              <span className="stat-change positive">+0.2°C from yesterday</span>
            </div>
            <div className="stat-item enhanced">
              <span className="stat-icon">📊</span>
              <span className="stat-label">Average</span>
              <span className="stat-value">{(currentData.datasets[0].data.reduce((a, b) => a + b, 0) / currentData.datasets[0].data.length).toFixed(1)}°C</span>
              <span className="stat-change neutral">YTD average</span>
            </div>
            <div className="stat-item enhanced">
              <span className="stat-icon">📈</span>
              <span className="stat-label">Trend</span>
              <span className="stat-value trend-up">+{((currentData.datasets[0].data[currentData.datasets[0].data.length - 1] - currentData.datasets[0].data[0]) / currentData.datasets[0].data.length).toFixed(2)}°C</span>
              <span className="stat-change positive">Monthly increase</span>
            </div>
            <div className="stat-item enhanced">
              <span className="stat-icon">🎯</span>
              <span className="stat-label">Confidence</span>
              <span className="stat-value confidence">95.2%</span>
              <span className="stat-change positive">Data reliability</span>
            </div>
          </>
        ) : (
          <>
            <div className="stat-item enhanced">
              <span className="stat-icon">🧪</span>
              <span className="stat-label">Surface</span>
              <span className="stat-value">{currentData.datasets[0].data[0].toFixed(2)}‰</span>
              <span className="stat-change neutral">0-10m depth</span>
            </div>
            <div className="stat-item enhanced">
              <span className="stat-icon">🏔️</span>
              <span className="stat-label">Deep</span>
              <span className="stat-value">{currentData.datasets[0].data[currentData.datasets[0].data.length - 1].toFixed(2)}‰</span>
              <span className="stat-change neutral">2000m+ depth</span>
            </div>
            <div className="stat-item enhanced">
              <span className="stat-icon">📏</span>
              <span className="stat-label">Range</span>
              <span className="stat-value">{(Math.max(...currentData.datasets[0].data) - Math.min(...currentData.datasets[0].data)).toFixed(2)}‰</span>
              <span className="stat-change neutral">Vertical gradient</span>
            </div>
            <div className="stat-item enhanced">
              <span className="stat-icon">✅</span>
              <span className="stat-label">Quality</span>
              <span className="stat-value confidence">97.8%</span>
              <span className="stat-change positive">Measurement accuracy</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataVisualization;