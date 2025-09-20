import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import './MapPreview.css';

// Fix for default markers in Leaflet with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Dummy ARGO float data
const floatData = [
  { id: 'ARG001', lat: 20.5, lng: 78.9, temp: 26.8, salinity: 35.2, status: 'active' },
  { id: 'ARG002', lat: 15.3, lng: 73.2, temp: 28.1, salinity: 35.0, status: 'active' },
  { id: 'ARG003', lat: 25.1, lng: 82.4, temp: 25.9, salinity: 35.4, status: 'active' },
  { id: 'ARG004', lat: 12.8, lng: 75.7, temp: 29.2, salinity: 34.8, status: 'transmitting' },
  { id: 'ARG005', lat: 22.4, lng: 88.1, temp: 27.3, salinity: 35.1, status: 'active' },
  { id: 'ARG006', lat: 18.9, lng: 72.8, temp: 27.8, salinity: 35.3, status: 'active' },
  { id: 'ARG007', lat: 14.2, lng: 74.9, temp: 28.9, salinity: 34.9, status: 'transmitting' },
  { id: 'ARG008', lat: 26.7, lng: 85.3, temp: 24.6, salinity: 35.6, status: 'active' },
  // Pacific Ocean
  { id: 'PAC001', lat: 35.2, lng: 139.7, temp: 22.1, salinity: 34.7, status: 'active' },
  { id: 'PAC002', lat: 33.8, lng: 151.2, temp: 21.8, salinity: 34.9, status: 'active' },
  { id: 'PAC003', lat: 21.3, lng: -157.8, temp: 26.4, salinity: 35.2, status: 'transmitting' },
  // Atlantic Ocean
  { id: 'ATL001', lat: 40.7, lng: -74.0, temp: 18.3, salinity: 35.8, status: 'active' },
  { id: 'ATL002', lat: 51.5, lng: -0.1, temp: 15.2, salinity: 35.1, status: 'active' },
];

const MapPreview = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([20, 77], 4);

    mapInstanceRef.current = map;

    // Add custom ocean-themed tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Custom ARGO float icon
    const createFloatIcon = (status) => {
      const color = status === 'active' ? '#00d4ff' : '#0ea5e9';
      return L.divIcon({
        className: 'custom-float-marker',
        html: `
          <div class="float-marker ${status}" style="
            width: 12px;
            height: 12px;
            background: ${color};
            border: 2px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 0 10px ${color};
            animation: float-pulse 2s ease-in-out infinite;
          "></div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
    };

    // Add ARGO float markers
    floatData.forEach((float) => {
      const marker = L.marker([float.lat, float.lng], {
        icon: createFloatIcon(float.status)
      }).addTo(map);

      // Custom popup
      marker.bindPopup(`
        <div class="float-popup">
          <h3>🌊 ARGO Float ${float.id}</h3>
          <div class="popup-data">
            <div class="data-row">
              <span class="label">Temperature:</span>
              <span class="value">${float.temp}°C</span>
            </div>
            <div class="data-row">
              <span class="label">Salinity:</span>
              <span class="value">${float.salinity}‰</span>
            </div>
            <div class="data-row">
              <span class="label">Status:</span>
              <span class="value status-${float.status}">${float.status}</span>
            </div>
            <div class="data-row">
              <span class="label">Location:</span>
              <span class="value">${float.lat.toFixed(2)}°, ${float.lng.toFixed(2)}°</span>
            </div>
          </div>
          <button class="view-profile-btn">View Profile</button>
        </div>
      `, {
        className: 'custom-popup'
      });
    });

    // Add ocean region labels
    const oceanLabels = [
      { name: 'Indian Ocean', lat: 20, lng: 75, color: '#00d4ff' },
      { name: 'Pacific Ocean', lat: 25, lng: 140, color: '#0ea5e9' },
      { name: 'Atlantic Ocean', lat: 45, lng: -30, color: '#0891b2' }
    ];

    oceanLabels.forEach((ocean) => {
      const labelMarker = L.divIcon({
        className: 'ocean-label',
        html: `
          <div style="
            color: ${ocean.color};
            font-weight: bold;
            font-size: 14px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            white-space: nowrap;
            text-align: center;
          ">${ocean.name}</div>
        `,
        iconSize: [100, 20],
        iconAnchor: [50, 10],
      });

      L.marker([ocean.lat, ocean.lng], { icon: labelMarker }).addTo(map);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.8; }
      }
      
      .custom-popup .leaflet-popup-content-wrapper {
        background: var(--card-bg) !important;
        border: 1px solid var(--border-color) !important;
        border-radius: 12px !important;
        backdrop-filter: blur(10px) !important;
      }
      
      .custom-popup .leaflet-popup-tip {
        background: var(--card-bg) !important;
        border: 1px solid var(--border-color) !important;
      }
      
      .float-popup {
        color: var(--text-primary);
        font-family: 'Inter', sans-serif;
        min-width: 200px;
      }
      
      .float-popup h3 {
        margin: 0 0 12px 0;
        color: var(--text-accent);
        font-size: 14px;
      }
      
      .popup-data {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 12px;
      }
      
      .data-row {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
      
      .data-row .label {
        color: var(--text-muted);
      }
      
      .data-row .value {
        color: var(--text-primary);
        font-weight: 500;
      }
      
      .status-active {
        color: #10b981 !important;
      }
      
      .status-transmitting {
        color: #f59e0b !important;
      }
      
      .view-profile-btn {
        width: 100%;
        padding: 6px 12px;
        background: var(--ocean-gradient);
        border: none;
        border-radius: 6px;
        color: white;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .view-profile-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="map-preview">
      <div className="map-container" ref={mapRef}></div>
      <div className="map-overlay">
        <div className="map-controls">
          <button className="map-control-btn" title="Zoom In">➕</button>
          <button className="map-control-btn" title="Zoom Out">➖</button>
          <button className="map-control-btn" title="Reset View">🎯</button>
        </div>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-marker active"></div>
            <span>Active Floats</span>
          </div>
          <div className="legend-item">
            <div className="legend-marker transmitting"></div>
            <span>Transmitting</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPreview;