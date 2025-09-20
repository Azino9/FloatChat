import React, { useState, useMemo } from 'react';
import './SmartDiscovery.css';

const SmartDiscovery = ({ floatData, onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState({
    region: 'all',
    parameter: 'all',
    timeRange: 'all',
    temperatureRange: [0, 35],
    salinityRange: [30, 40],
    status: 'all'
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  // Sample historical data for time-based filtering
  const timeRanges = [
    { value: 'all', label: 'All Time', days: null },
    { value: '7d', label: 'Last 7 Days', days: 7 },
    { value: '30d', label: 'Last 30 Days', days: 30 },
    { value: '90d', label: 'Last 3 Months', days: 90 },
    { value: '1y', label: 'Last Year', days: 365 }
  ];

  const regions = [
    { value: 'all', label: 'All Oceans' },
    { value: 'Indian Ocean', label: 'Indian Ocean' },
    { value: 'Pacific Ocean', label: 'Pacific Ocean' },
    { value: 'Atlantic Ocean', label: 'Atlantic Ocean' },
    { value: 'Arctic Ocean', label: 'Arctic Ocean' },
    { value: 'Southern Ocean', label: 'Southern Ocean' }
  ];

  const parameters = [
    { value: 'all', label: 'All Parameters' },
    { value: 'temperature', label: 'Temperature' },
    { value: 'salinity', label: 'Salinity' },
    { value: 'depth', label: 'Depth Profile' },
    { value: 'current', label: 'Ocean Currents' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active Only' },
    { value: 'transmitting', label: 'Transmitting Only' }
  ];

  // Filter the float data based on current filters
  const filteredData = useMemo(() => {
    return floatData.filter(float => {
      // Region filter
      if (activeFilters.region !== 'all' && float.region !== activeFilters.region) {
        return false;
      }

      // Status filter
      if (activeFilters.status !== 'all' && float.status !== activeFilters.status) {
        return false;
      }

      // Temperature range filter
      if (float.temp < activeFilters.temperatureRange[0] || float.temp > activeFilters.temperatureRange[1]) {
        return false;
      }

      // Salinity range filter
      if (float.salinity < activeFilters.salinityRange[0] || float.salinity > activeFilters.salinityRange[1]) {
        return false;
      }

      return true;
    });
  }, [floatData, activeFilters]);

  // Update filters and notify parent component
  const updateFilter = (filterKey, value) => {
    const newFilters = { ...activeFilters, [filterKey]: value };
    setActiveFilters(newFilters);
    onFilterChange && onFilterChange(newFilters, filteredData);
  };

  const resetFilters = () => {
    const defaultFilters = {
      region: 'all',
      parameter: 'all',
      timeRange: 'all',
      temperatureRange: [0, 35],
      salinityRange: [30, 40],
      status: 'all'
    };
    setActiveFilters(defaultFilters);
    onFilterChange && onFilterChange(defaultFilters, floatData);
  };

  // Statistics for current filter results
  const stats = useMemo(() => {
    return {
      totalFloats: filteredData.length,
      activeFloats: filteredData.filter(f => f.status === 'active').length,
      transmittingFloats: filteredData.filter(f => f.status === 'transmitting').length,
      avgTemperature: filteredData.length > 0 ? 
        (filteredData.reduce((sum, f) => sum + f.temp, 0) / filteredData.length).toFixed(1) : 0,
      avgSalinity: filteredData.length > 0 ? 
        (filteredData.reduce((sum, f) => sum + f.salinity, 0) / filteredData.length).toFixed(1) : 0,
      regions: [...new Set(filteredData.map(f => f.region))]
    };
  }, [filteredData]);

  return (
    <div className="smart-discovery">
      <div className="discovery-header">
        <h2 className="discovery-title">
          🔍 Smart Discovery
          <span className="discovery-subtitle">Advanced Ocean Data Filtering</span>
        </h2>
        <button 
          className="toggle-advanced-btn"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? '🔼 Simple View' : '🔽 Advanced Filters'}
        </button>
      </div>

      {/* Quick Stats */}
      <div className="discovery-stats">
        <div className="stat-card">
          <span className="stat-icon">🌊</span>
          <div className="stat-info">
            <div className="stat-value">{stats.totalFloats}</div>
            <div className="stat-label">Total Floats</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🟢</span>
          <div className="stat-info">
            <div className="stat-value">{stats.activeFloats}</div>
            <div className="stat-label">Active</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🌡️</span>
          <div className="stat-info">
            <div className="stat-value">{stats.avgTemperature}°C</div>
            <div className="stat-label">Avg Temp</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💧</span>
          <div className="stat-info">
            <div className="stat-value">{stats.avgSalinity}‰</div>
            <div className="stat-label">Avg Salinity</div>
          </div>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="filter-section">
        <h3 className="filter-section-title">🎯 Basic Filters</h3>
        <div className="filter-grid">
          {/* Region Filter */}
          <div className="filter-group">
            <label className="filter-label">Ocean Region</label>
            <select 
              className="filter-select"
              value={activeFilters.region}
              onChange={(e) => updateFilter('region', e.target.value)}
            >
              {regions.map(region => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          {/* Parameter Filter */}
          <div className="filter-group">
            <label className="filter-label">Data Parameter</label>
            <select 
              className="filter-select"
              value={activeFilters.parameter}
              onChange={(e) => updateFilter('parameter', e.target.value)}
            >
              {parameters.map(param => (
                <option key={param.value} value={param.value}>
                  {param.label}
                </option>
              ))}
            </select>
          </div>

          {/* Time Range Filter */}
          <div className="filter-group">
            <label className="filter-label">Time Range</label>
            <select 
              className="filter-select"
              value={activeFilters.timeRange}
              onChange={(e) => updateFilter('timeRange', e.target.value)}
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="filter-group">
            <label className="filter-label">Float Status</label>
            <select 
              className="filter-select"
              value={activeFilters.status}
              onChange={(e) => updateFilter('status', e.target.value)}
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="filter-section advanced-filters">
          <h3 className="filter-section-title">⚙️ Advanced Filters</h3>
          <div className="advanced-filter-grid">
            {/* Temperature Range */}
            <div className="range-filter">
              <label className="filter-label">
                Temperature Range: {activeFilters.temperatureRange[0]}°C - {activeFilters.temperatureRange[1]}°C
              </label>
              <div className="range-inputs">
                <input 
                  type="range"
                  className="range-slider"
                  min="0"
                  max="35"
                  value={activeFilters.temperatureRange[0]}
                  onChange={(e) => updateFilter('temperatureRange', [parseFloat(e.target.value), activeFilters.temperatureRange[1]])}
                />
                <input 
                  type="range"
                  className="range-slider"
                  min="0"
                  max="35"
                  value={activeFilters.temperatureRange[1]}
                  onChange={(e) => updateFilter('temperatureRange', [activeFilters.temperatureRange[0], parseFloat(e.target.value)])}
                />
              </div>
            </div>

            {/* Salinity Range */}
            <div className="range-filter">
              <label className="filter-label">
                Salinity Range: {activeFilters.salinityRange[0]}‰ - {activeFilters.salinityRange[1]}‰
              </label>
              <div className="range-inputs">
                <input 
                  type="range"
                  className="range-slider"
                  min="30"
                  max="40"
                  step="0.1"
                  value={activeFilters.salinityRange[0]}
                  onChange={(e) => updateFilter('salinityRange', [parseFloat(e.target.value), activeFilters.salinityRange[1]])}
                />
                <input 
                  type="range"
                  className="range-slider"
                  min="30"
                  max="40"
                  step="0.1"
                  value={activeFilters.salinityRange[1]}
                  onChange={(e) => updateFilter('salinityRange', [activeFilters.salinityRange[0], parseFloat(e.target.value)])}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Actions */}
      <div className="filter-actions">
        <button className="reset-filters-btn" onClick={resetFilters}>
          🔄 Reset All Filters
        </button>
        <div className="filter-results">
          <span className="results-count">
            Showing {stats.totalFloats} of {floatData.length} floats
          </span>
        </div>
      </div>

      {/* Active Regions */}
      {stats.regions.length > 0 && (
        <div className="active-regions">
          <h4 className="regions-title">📍 Active Regions</h4>
          <div className="regions-list">
            {stats.regions.map(region => (
              <span key={region} className="region-tag">
                {region}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartDiscovery;