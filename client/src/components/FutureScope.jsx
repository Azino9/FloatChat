import React from 'react';
import './FutureScope.css';

const FutureScope = ({ onNavigateToLivebooks }) => {
  const futureFeatures = [
    {
      icon: '🔮',
      title: 'Predictive Analysis',
      description: 'AI-powered climate change predictions using historical ARGO data',
      features: [
        'Ocean temperature forecasting',
        'Sea level rise predictions',
        'Marine ecosystem changes',
        'Extreme weather patterns'
      ],
      timeline: '2025-2026',
      impact: 'Climate Research'
    },
    {
      icon: '🎓',
      title: 'Student Learning Mode',
      description: 'Interactive educational platform for oceanography students',
      features: [
        'Guided ocean data tutorials',
        'Interactive learning modules',
        'Virtual lab experiments',
        'Progress tracking & certificates'
      ],
      timeline: '2025',
      impact: 'Education'
    },
    {
      icon: '📋',
      title: 'Policy Reports',
      description: 'Automated report generation for policymakers and researchers',
      features: [
        'Executive summary generation',
        'Data-driven policy recommendations',
        'Trend analysis reports',
        'Comparative regional studies'
      ],
      timeline: '2026',
      impact: 'Policy Making'
    },
    {
      icon: '🌍',
      title: 'Global Collaboration',
      description: 'Connect researchers worldwide for ocean data sharing',
      features: [
        'Real-time collaboration tools',
        'Data sharing protocols',
        'Research project management',
        'International data standards'
      ],
      timeline: '2026-2027',
      impact: 'Research Community'
    }
  ];

  const impactMetrics = [
    { value: '50+', label: 'Research Institutions', icon: '🏛️' },
    { value: '1M+', label: 'Students Reached', icon: '🎓' },
    { value: '100+', label: 'Countries Connected', icon: '🌍' },
    { value: '24/7', label: 'Data Availability', icon: '⏰' }
  ];

  return (
    <div className="future-scope">
      {/* Header Section */}
      <div className="scope-header">
        <div className="header-content fade-in-up">
          <h1 className="scope-title">Future Impact & Vision</h1>
          <p className="scope-subtitle">
            Transforming ocean science through AI-powered insights and global collaboration
          </p>
        </div>
        
        <div className="impact-metrics slide-in-left">
          {impactMetrics.map((metric, index) => (
            <div key={index} className="metric-card glass">
              <div className="metric-icon">{metric.icon}</div>
              <div className="metric-value ocean-text">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Features Grid */}
      <div className="features-grid">
        {futureFeatures.map((feature, index) => (
          <div 
            key={index} 
            className={`feature-card glass slide-in-right ${feature.title === 'Student Learning Mode' ? 'clickable-card' : ''}`} 
            style={{animationDelay: `${index * 0.1}s`}}
            onClick={feature.title === 'Student Learning Mode' ? () => onNavigateToLivebooks() : undefined}
          >
            <div className="feature-header">
              <div className="feature-icon animate-float">{feature.icon}</div>
              <div className="feature-info">
                <h3 className="feature-title">{feature.title}</h3>
                <div className="feature-timeline">
                  <span className="timeline-badge">{feature.timeline}</span>
                  <span className="impact-badge">{feature.impact}</span>
                </div>
              </div>
            </div>
            
            <p className="feature-description">{feature.description}</p>
            
            <div className="feature-list">
              {feature.features.map((item, idx) => (
                <div key={idx} className="feature-item">
                  <span className="item-icon">✨</span>
                  <span className="item-text">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="feature-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${Math.random() * 40 + 20}%`}}
                ></div>
              </div>
              <span className="progress-label">Development Progress</span>
            </div>
          </div>
        ))}
      </div>

      {/* Vision Statement */}
      <div className="vision-section">
        <div className="vision-content glass fade-in-up">
          <h2 className="vision-title">Our Vision for Ocean Science</h2>
          <div className="vision-grid">
            <div className="vision-item">
              <h4>🌊 Democratize Ocean Data</h4>
              <p>Make complex oceanographic data accessible to everyone through natural language interfaces</p>
            </div>
            <div className="vision-item">
              <h4>🤝 Foster Collaboration</h4>
              <p>Connect researchers, students, and policymakers in a unified platform for ocean science</p>
            </div>
            <div className="vision-item">
              <h4>🔬 Accelerate Discovery</h4>
              <p>Use AI to uncover hidden patterns and insights in vast ocean datasets</p>
            </div>
            <div className="vision-item">
              <h4>🌍 Address Climate Change</h4>
              <p>Provide actionable insights for climate adaptation and mitigation strategies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h3 className="cta-title">Ready to Shape the Future?</h3>
          <p className="cta-text">
            Join us in revolutionizing how we understand and protect our oceans
          </p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Get Early Access</button>
            <button className="cta-btn secondary">Partner With Us</button>
            <button className="cta-btn tertiary">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureScope;