import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, PieChart, Pie, Cell
} from 'recharts';
import { researchData } from '../data/researchData';

const ResearchHub = () => {
  const [selectedDataset, setSelectedDataset] = useState('temperature');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [viewType, setViewType] = useState('line');

  const datasetOptions = {
    temperature: {
      title: 'Ocean Temperature Trends',
      data: researchData.temperatureTrends,
      color: '#FF6B6B',
      unit: '°C'
    },
    salinity: {
      title: 'Salinity Measurements',
      data: researchData.salinityData,
      color: '#4ECDC4',
      unit: 'PSU'
    },
    currentStrength: {
      title: 'Current Strength Analysis',
      data: researchData.currentStrength,
      color: '#45B7D1',
      unit: 'm/s'
    }
  };

  const currentDataset = datasetOptions[selectedDataset];

  const filteredData = selectedRegion === 'all' 
    ? currentDataset.data 
    : currentDataset.data.filter(item => item.region === selectedRegion);

  const regions = [...new Set(currentDataset.data.map(item => item.region))];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const renderChart = () => {
    switch (viewType) {
      case 'area':
        return (
          <AreaChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={currentDataset.color} 
              fill={currentDataset.color}
              fillOpacity={0.3}
            />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill={currentDataset.color} />
          </BarChart>
        );
      default:
        return (
          <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={currentDataset.color} 
              strokeWidth={3}
              dot={{ fill: currentDataset.color, strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          📊 Ocean Research Hub
        </h1>

        {/* Research Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {researchData.researchSummary.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <div className="text-3xl font-bold text-blue-600 mb-1">{item.value}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
            </div>
          ))}
        </div>

        {/* Data Visualization Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Interactive Data Analysis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Dataset Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Dataset
              </label>
              <div className="space-y-2">
                {Object.entries(datasetOptions).map(([key, option]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDataset(key)}
                    className={`w-full p-3 text-left rounded-lg transition-all ${
                      selectedDataset === key
                        ? 'bg-blue-100 border-2 border-blue-400 text-blue-900'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="font-medium">{option.title}</div>
                    <div className="text-sm text-gray-600">Unit: {option.unit}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Filter by Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Chart Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Chart Type
              </label>
              <div className="space-y-2">
                {[
                  { key: 'line', label: 'Line Chart', icon: '📈' },
                  { key: 'area', label: 'Area Chart', icon: '📊' },
                  { key: 'bar', label: 'Bar Chart', icon: '📊' }
                ].map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setViewType(type.key)}
                    className={`w-full p-2 text-left rounded-lg transition-all ${
                      viewType === type.key
                        ? 'bg-green-100 border border-green-400 text-green-900'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {type.icon} {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Display */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {currentDataset.title}
              {selectedRegion !== 'all' && ` - ${selectedRegion}`}
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              {renderChart()}
            </ResponsiveContainer>
          </div>

          {/* Data Statistics */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.max(...filteredData.map(d => d.value)).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Maximum Value</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.min(...filteredData.map(d => d.value)).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Minimum Value</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {(filteredData.reduce((sum, d) => sum + d.value, 0) / filteredData.length).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Average Value</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {filteredData.length}
              </div>
              <div className="text-sm text-gray-600">Data Points</div>
            </div>
          </div>
        </div>

        {/* Research Publications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📚 Recent Research</h3>
            <div className="space-y-4">
              {researchData.publications.slice(0, 5).map((pub) => (
                <div key={pub.id} className="border-l-4 border-blue-400 pl-4 py-2">
                  <h4 className="font-medium text-gray-900">{pub.title}</h4>
                  <p className="text-sm text-gray-600">
                    {pub.authors} • {pub.journal} • {pub.year}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {pub.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🗺️ Research Locations</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="text-sm text-gray-600 mb-2">Active Research Sites</div>
              <div className="grid grid-cols-2 gap-4">
                {researchData.mapMarkers.slice(0, 6).map((marker) => (
                  <div key={marker.id} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      marker.type === 'ARGO' ? 'bg-blue-500' : 
                      marker.type === 'Research Station' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="text-sm">
                      <div className="font-medium">{marker.name}</div>
                      <div className="text-xs text-gray-500">{marker.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              {researchData.mapMarkers.slice(0, 3).map((marker) => (
                <div key={marker.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{marker.name}</h4>
                      <p className="text-sm text-gray-600">{marker.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      marker.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {marker.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    📍 {marker.coordinates.lat.toFixed(2)}°, {marker.coordinates.lng.toFixed(2)}°
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Datasets Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">🗃️ Available Datasets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchData.datasets.map((dataset) => (
              <div key={dataset.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">{dataset.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{dataset.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Records:</span>
                    <span className="font-medium">{dataset.records.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Updated:</span>
                    <span className="font-medium">{dataset.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Format:</span>
                    <span className="font-medium">{dataset.format}</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  Access Dataset
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchHub;