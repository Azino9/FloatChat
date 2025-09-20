import React, { useState } from 'react';
import './LatestNews.css';

const LatestNews = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const newsData = [
    {
      id: 1,
      title: "New Deep-Sea Species Discovered in Mariana Trench",
      category: "discovery",
      date: "2025-09-18",
      summary: "Marine biologists have identified three new species of bioluminescent organisms at unprecedented depths.",
      content: "A team of international researchers using advanced submersibles has discovered three new species of bioluminescent organisms in the deepest parts of the Mariana Trench...",
      source: "Ocean Discovery Institute",
      image: "🐠",
      tags: ["Deep Sea", "Marine Biology", "Discovery"]
    },
    {
      id: 2,
      title: "Ocean Temperature Rises Faster Than Expected",
      category: "climate",
      date: "2025-09-17",
      summary: "Latest ARGO float data reveals accelerated warming in the upper 2000m of ocean layers.",
      content: "Analysis of over 10,000 ARGO floats worldwide shows that ocean temperatures are rising 40% faster than previously estimated...",
      source: "Global Climate Research Center",
      image: "🌡️",
      tags: ["Climate Change", "Temperature", "ARGO Data"]
    },
    {
      id: 3,
      title: "Revolutionary AI Model Predicts Ocean Currents",
      category: "technology",
      date: "2025-09-16",
      summary: "Machine learning breakthrough enables 99% accurate current predictions up to 30 days in advance.",
      content: "Researchers at MIT have developed an AI model that can predict ocean current patterns with unprecedented accuracy...",
      source: "MIT Ocean Engineering",
      image: "🤖",
      tags: ["AI", "Machine Learning", "Ocean Currents"]
    },
    {
      id: 4,
      title: "Coral Reef Restoration Success in Great Barrier Reef",
      category: "conservation",
      date: "2025-09-15",
      summary: "Large-scale restoration project shows 85% coral recovery in treated areas.",
      content: "The most ambitious coral restoration project in history has achieved remarkable success in the Great Barrier Reef...",
      source: "Australian Marine Conservation Society",
      image: "🪸",
      tags: ["Conservation", "Coral Reefs", "Restoration"]
    },
    {
      id: 5,
      title: "Breakthrough in Ocean Plastic Cleanup Technology",
      category: "technology",
      date: "2025-09-14",
      summary: "New enzyme technology can break down plastic pollution 6 times faster than previous methods.",
      content: "Scientists have engineered a new enzyme that can rapidly break down ocean plastic pollution...",
      source: "Environmental Tech Institute",
      image: "♻️",
      tags: ["Plastic Pollution", "Cleanup", "Biotechnology"]
    },
    {
      id: 6,
      title: "Antarctic Ice Sheet Melting Patterns Revealed",
      category: "research",
      date: "2025-09-13",
      summary: "Satellite data and ocean sensors reveal complex melting patterns affecting global sea levels.",
      content: "A comprehensive study combining satellite imagery with ocean sensor data has revealed...",
      source: "Antarctic Research Consortium",
      image: "🧊",
      tags: ["Antarctica", "Ice Sheets", "Sea Level"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All News', icon: '📰', count: newsData.length },
    { id: 'discovery', name: 'Discoveries', icon: '🔍', count: newsData.filter(n => n.category === 'discovery').length },
    { id: 'climate', name: 'Climate', icon: '🌡️', count: newsData.filter(n => n.category === 'climate').length },
    { id: 'technology', name: 'Technology', icon: '🚀', count: newsData.filter(n => n.category === 'technology').length },
    { id: 'conservation', name: 'Conservation', icon: '🌊', count: newsData.filter(n => n.category === 'conservation').length },
    { id: 'research', name: 'Research', icon: '🔬', count: newsData.filter(n => n.category === 'research').length }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(article => article.category === selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="latest-news-container">
      {/* Header */}
      <div className="news-header">
        <div className="header-content">
          <h1 className="news-title">
            <span className="title-icon">📰</span>
            Latest Ocean News
          </h1>
          <p className="news-subtitle">
            Stay updated with the latest discoveries, research, and developments in marine science
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <div className="filter-container">
          <h3 className="filter-title">Categories</h3>
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

      {/* News Grid */}
      <div className="news-content">
        <div className="news-grid">
          {filteredNews.map(article => (
            <div 
              key={article.id} 
              className="news-card"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="card-header">
                <div className="article-image">{article.image}</div>
                <div className="article-meta">
                  <span className="article-date">{formatDate(article.date)}</span>
                  <span className="article-source">{article.source}</span>
                </div>
              </div>
              
              <div className="card-content">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-summary">{article.summary}</p>
                
                <div className="article-tags">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              
              <div className="card-footer">
                <button className="read-more-btn">
                  Read Full Article →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="article-modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="article-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-meta">
                <span className="modal-date">{formatDate(selectedArticle.date)}</span>
                <span className="modal-source">{selectedArticle.source}</span>
              </div>
              <button 
                className="close-modal"
                onClick={() => setSelectedArticle(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="modal-image">{selectedArticle.image}</div>
              <h2 className="modal-title">{selectedArticle.title}</h2>
              <p className="modal-text">{selectedArticle.content}</p>
              
              <div className="modal-tags">
                {selectedArticle.tags.map((tag, index) => (
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

export default LatestNews;