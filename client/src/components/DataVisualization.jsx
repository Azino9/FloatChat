import React from 'react';
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
import './DataVisualization.css';

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
  // Dummy data for ocean temperature over time
  const temperatureData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Indian Ocean SST (°C)',
        data: [26.2, 27.1, 28.3, 29.1, 28.7, 27.9, 26.8, 26.5, 27.2, 27.8, 27.5, 26.9],
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00d4ff',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Pacific Ocean SST (°C)',
        data: [24.8, 25.2, 26.1, 26.8, 26.3, 25.7, 24.9, 24.6, 25.3, 25.9, 25.6, 25.1],
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#0ea5e9',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  // Dummy data for salinity vs depth profile
  const salinityData = {
    labels: ['0m', '100m', '200m', '500m', '1000m', '1500m', '2000m', '3000m', '4000m'],
    datasets: [
      {
        label: 'Salinity (‰)',
        data: [34.2, 34.5, 34.8, 35.1, 35.3, 35.2, 35.0, 34.9, 34.8],
        borderColor: '#0891b2',
        backgroundColor: 'rgba(8, 145, 178, 0.2)',
        borderWidth: 3,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#0891b2',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#b3c5d9',
          font: {
            family: 'Inter',
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: type === 'temperature' ? 'Sea Surface Temperature Trends' : 'Salinity Profile by Depth',
        color: '#ffffff',
        font: {
          family: 'Orbitron',
          size: 16,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 20, 25, 0.95)',
        titleColor: '#00d4ff',
        bodyColor: '#ffffff',
        borderColor: '#1e3a5f',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          family: 'Inter',
          size: 13,
          weight: 'bold',
        },
        bodyFont: {
          family: 'Inter',
          size: 12,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(30, 58, 95, 0.3)',
          drawBorder: false,
        },
        ticks: {
          color: '#b3c5d9',
          font: {
            family: 'Inter',
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(30, 58, 95, 0.3)',
          drawBorder: false,
        },
        ticks: {
          color: '#b3c5d9',
          font: {
            family: 'Inter',
            size: 11,
          },
          callback: function(value) {
            return type === 'temperature' ? value + '°C' : value + '‰';
          },
        },
      },
    },
    elements: {
      point: {
        hoverBorderWidth: 3,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const currentData = type === 'temperature' ? temperatureData : salinityData;

  return (
    <div className="data-visualization">
      <div className="chart-container">
        <Line data={currentData} options={chartOptions} />
      </div>
      
      {/* Data Insights */}
      <div className="data-insights">
        <div className="insight-cards">
          {type === 'temperature' ? (
            <>
              <div className="insight-card">
                <div className="insight-icon">🌡️</div>
                <div className="insight-content">
                  <div className="insight-value">28.1°C</div>
                  <div className="insight-label">Peak Temperature</div>
                </div>
              </div>
              <div className="insight-card">
                <div className="insight-icon">📈</div>
                <div className="insight-content">
                  <div className="insight-value">+2.3°C</div>
                  <div className="insight-label">Seasonal Range</div>
                </div>
              </div>
              <div className="insight-card">
                <div className="insight-icon">🔥</div>
                <div className="insight-content">
                  <div className="insight-value">April</div>
                  <div className="insight-label">Warmest Month</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="insight-card">
                <div className="insight-icon">🧂</div>
                <div className="insight-content">
                  <div className="insight-value">35.3‰</div>
                  <div className="insight-label">Max Salinity</div>
                </div>
              </div>
              <div className="insight-card">
                <div className="insight-icon">📊</div>
                <div className="insight-content">
                  <div className="insight-value">1000m</div>
                  <div className="insight-label">Peak Depth</div>
                </div>
              </div>
              <div className="insight-card">
                <div className="insight-icon">⚖️</div>
                <div className="insight-content">
                  <div className="insight-value">1.1‰</div>
                  <div className="insight-label">Variation</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;