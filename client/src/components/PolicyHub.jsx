import React, { useState } from 'react';
import './PolicyHub.css';

const PolicyHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const policyData = [
    {
      id: 1,
      title: "International Maritime Organization (IMO) 2025 Guidelines",
      category: "maritime",
      date: "2025-09-01",
      status: "active",
      region: "International",
      summary: "New regulations for autonomous vessel operations and safety protocols in international waters.",
      content: "The IMO has established comprehensive guidelines for the operation of Maritime Autonomous Surface Ships (MASS) in international waters. These regulations cover safety protocols, communication systems, and liability frameworks...",
      authority: "International Maritime Organization",
      impact: "High",
      tags: ["Autonomous Vessels", "Safety", "International Waters"]
    },
    {
      id: 2,
      title: "EU Marine Strategy Framework Directive Update",
      category: "environmental",
      date: "2025-08-28",
      status: "pending",
      region: "European Union",
      summary: "Enhanced marine biodiversity protection measures and plastic pollution reduction targets.",
      content: "The European Union has updated its Marine Strategy Framework Directive to include stricter biodiversity protection measures and ambitious plastic pollution reduction targets for 2030...",
      authority: "European Commission",
      impact: "High",
      tags: ["Biodiversity", "Plastic Pollution", "EU Waters"]
    },
    {
      id: 3,
      title: "NOAA Fisheries Sustainable Catch Quotas 2025",
      category: "fisheries",
      date: "2025-08-25",
      status: "active",
      region: "United States",
      summary: "Updated fishing quotas based on latest stock assessments and climate change impacts.",
      content: "NOAA Fisheries has released updated catch quotas for commercial and recreational fishing, incorporating climate change impacts on fish populations and migration patterns...",
      authority: "NOAA Fisheries",
      impact: "Medium",
      tags: ["Fishing Quotas", "Stock Assessment", "Climate Impact"]
    },
    {
      id: 4,
      title: "Antarctic Treaty System - Research Protocol Updates",
      category: "research",
      date: "2025-08-20",
      status: "active",
      region: "Antarctica",
      summary: "New protocols for scientific research activities and environmental monitoring in Antarctic waters.",
      content: "The Antarctic Treaty Consultative Meeting has approved new protocols for scientific research activities, emphasizing minimal environmental impact and enhanced data sharing...",
      authority: "Antarctic Treaty System",
      impact: "Medium",
      tags: ["Antarctic Research", "Environmental Protection", "Data Sharing"]
    },
    {
      id: 5,
      title: "Pacific Island Climate Adaptation Fund",
      category: "climate",
      date: "2025-08-15",
      status: "funding",
      region: "Pacific Islands",
      summary: "$2.5B fund established for climate adaptation and ocean resilience projects.",
      content: "A new $2.5 billion fund has been established to support climate adaptation and ocean resilience projects across Pacific Island nations, focusing on sea level rise and coral reef protection...",
      authority: "Pacific Islands Forum",
      impact: "High",
      tags: ["Climate Adaptation", "Sea Level Rise", "Coral Reefs"]
    },
    {
      id: 6,
      title: "Deep Sea Mining Moratorium Extension",
      category: "conservation",
      date: "2025-08-10",
      status: "active",
      region: "International",
      summary: "Two-year extension of deep sea mining moratorium pending environmental impact studies.",
      content: "The International Seabed Authority has extended the moratorium on deep sea mining activities for an additional two years while comprehensive environmental impact studies are completed...",
      authority: "International Seabed Authority",
      impact: "High",
      tags: ["Deep Sea Mining", "Environmental Impact", "Moratorium"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Policies', icon: '📋', count: policyData.length },
    { id: 'maritime', name: 'Maritime Law', icon: '⚓', count: policyData.filter(p => p.category === 'maritime').length },
    { id: 'environmental', name: 'Environmental', icon: '🌊', count: policyData.filter(p => p.category === 'environmental').length },
    { id: 'fisheries', name: 'Fisheries', icon: '🐟', count: policyData.filter(p => p.category === 'fisheries').length },
    { id: 'research', name: 'Research', icon: '🔬', count: policyData.filter(p => p.category === 'research').length },
    { id: 'climate', name: 'Climate', icon: '🌡️', count: policyData.filter(p => p.category === 'climate').length },
    { id: 'conservation', name: 'Conservation', icon: '🛡️', count: policyData.filter(p => p.category === 'conservation').length }
  ];

  const filteredPolicies = selectedCategory === 'all' 
    ? policyData 
    : policyData.filter(policy => policy.category === selectedCategory);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'funding': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="policy-hub-container">
      {/* Header */}
      <div className="policy-header">
        <div className="header-content">
          <h1 className="policy-title">
            <span className="title-icon">📋</span>
            Ocean Policy Hub
          </h1>
          <p className="policy-subtitle">
            Stay informed about maritime regulations, environmental policies, and conservation initiatives
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <div className="filter-container">
          <h3 className="filter-title">Policy Categories</h3>
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-name">{category.name}</span>
                <span className="tab-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Policy Grid */}
      <div className="policy-content">
        <div className="policy-grid">
          {filteredPolicies.map(policy => (
            <div 
              key={policy.id} 
              className="policy-card"
              onClick={() => setSelectedPolicy(policy)}
            >
              <div className="card-header">
                <div className="policy-status-section">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: `${getStatusColor(policy.status)}20`, 
                            borderColor: getStatusColor(policy.status), 
                            color: getStatusColor(policy.status) }}
                  >
                    {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                  </span>
                  <span 
                    className="impact-badge"
                    style={{ backgroundColor: `${getImpactColor(policy.impact)}20`, 
                            borderColor: getImpactColor(policy.impact), 
                            color: getImpactColor(policy.impact) }}
                  >
                    {policy.impact} Impact
                  </span>
                </div>
                <div className="policy-meta">
                  <span className="policy-date">{formatDate(policy.date)}</span>
                  <span className="policy-region">{policy.region}</span>
                </div>
              </div>
              
              <div className="card-content">
                <h3 className="policy-title-card">{policy.title}</h3>
                <p className="policy-summary">{policy.summary}</p>
                <p className="policy-authority">
                  <strong>Authority:</strong> {policy.authority}
                </p>
                
                <div className="policy-tags">
                  {policy.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              
              <div className="card-footer">
                <button className="view-details-btn">
                  View Full Policy →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Modal */}
      {selectedPolicy && (
        <div className="policy-modal-overlay" onClick={() => setSelectedPolicy(null)}>
          <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-meta">
                <div className="modal-badges">
                  <span 
                    className="modal-status-badge"
                    style={{ backgroundColor: `${getStatusColor(selectedPolicy.status)}20`, 
                            borderColor: getStatusColor(selectedPolicy.status), 
                            color: getStatusColor(selectedPolicy.status) }}
                  >
                    {selectedPolicy.status.charAt(0).toUpperCase() + selectedPolicy.status.slice(1)}
                  </span>
                  <span 
                    className="modal-impact-badge"
                    style={{ backgroundColor: `${getImpactColor(selectedPolicy.impact)}20`, 
                            borderColor: getImpactColor(selectedPolicy.impact), 
                            color: getImpactColor(selectedPolicy.impact) }}
                  >
                    {selectedPolicy.impact} Impact
                  </span>
                </div>
                <div className="modal-info">
                  <span className="modal-date">{formatDate(selectedPolicy.date)}</span>
                  <span className="modal-region">{selectedPolicy.region}</span>
                  <span className="modal-authority">{selectedPolicy.authority}</span>
                </div>
              </div>
              <button 
                className="close-modal"
                onClick={() => setSelectedPolicy(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <h2 className="modal-title">{selectedPolicy.title}</h2>
              <p className="modal-text">{selectedPolicy.content}</p>
              
              <div className="modal-tags">
                {selectedPolicy.tags.map((tag, index) => (
                  <span key={index} className="modal-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyHub;