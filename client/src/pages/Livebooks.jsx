import React, { useState } from 'react';
import './Livebooks.css';
import LearningModule from '../components/LearningModule';

const Livebooks = () => {
  const [selectedSession, setSelectedSession] = useState(3);
  const [selectedModule, setSelectedModule] = useState(null);

  // Oceanography and Marine Science Curriculum - Different subjects for each session
  const getSessionLivebooks = (sessionId) => {
    const curriculumData = {
      1: [ // Session 1: Foundation Marine Sciences
        {
          id: 1,
          title: 'Marine Biology Fundamentals',
          description: 'Introduction to marine organisms and their classification',
          progress: 85,
          mastery: 88,
          icon: '🐠',
          lessons: 14,
          questions: 52,
          assignments: 9,
          completion: 85
        },
        {
          id: 2,
          title: 'Ocean Chemistry & Physics',
          description: 'Chemical and physical properties of seawater',
          progress: 72,
          mastery: 75,
          icon: '🌊',
          lessons: 16,
          questions: 68,
          assignments: 11,
          completion: 72
        },
        {
          id: 3,
          title: 'Coastal Ecosystems',
          description: 'Study of intertidal zones and coastal habitats',
          progress: 90,
          mastery: 93,
          icon: '🏖️',
          lessons: 12,
          questions: 45,
          assignments: 8,
          completion: 90
        },
        {
          id: 4,
          title: 'Marine Plant Life & Algae',
          description: 'Phytoplankton, seaweeds, and marine botany',
          progress: 65,
          mastery: 68,
          icon: '🌿',
          lessons: 13,
          questions: 48,
          assignments: 7,
          completion: 65
        }
      ],
      2: [ // Session 2: Applied Marine Sciences
        {
          id: 5,
          title: 'Deep Sea Exploration',
          description: 'Abyssal plains, hydrothermal vents, and deep-sea life',
          progress: 78,
          mastery: 80,
          icon: '🔍',
          lessons: 18,
          questions: 72,
          assignments: 12,
          completion: 78
        },
        {
          id: 6,
          title: 'Marine Conservation Laws',
          description: 'International maritime law and conservation policies',
          progress: 55,
          mastery: 58,
          icon: '⚖️',
          lessons: 15,
          questions: 55,
          assignments: 10,
          completion: 55
        },
        {
          id: 7,
          title: 'Fisheries & Aquaculture',
          description: 'Sustainable fishing practices and marine farming',
          progress: 82,
          mastery: 85,
          icon: '🎣',
          lessons: 17,
          questions: 63,
          assignments: 13,
          completion: 82
        },
        {
          id: 8,
          title: 'Ocean Pollution Studies',
          description: 'Marine contamination and environmental impact',
          progress: 40,
          mastery: 43,
          icon: '🏭',
          lessons: 14,
          questions: 49,
          assignments: 9,
          completion: 40
        }
      ],
      3: [ // Session 3: Advanced Marine Studies
        {
          id: 9,
          title: 'Climate & Ocean Interactions',
          description: 'Ocean currents, climate change, and global patterns',
          progress: 68,
          mastery: 70,
          icon: '🌡️',
          lessons: 20,
          questions: 85,
          assignments: 15,
          completion: 68
        },
        {
          id: 10,
          title: 'Maritime Economics',
          description: 'Ocean trade, shipping industry, and marine resources',
          progress: 45,
          mastery: 48,
          icon: '📈',
          lessons: 16,
          questions: 58,
          assignments: 11,
          completion: 45
        },
        {
          id: 11,
          title: 'Marine Biotechnology',
          description: 'Bioactive compounds and pharmaceutical applications',
          progress: 30,
          mastery: 33,
          icon: '🧬',
          lessons: 19,
          questions: 78,
          assignments: 14,
          completion: 30
        },
        {
          id: 12,
          title: 'Ocean Data Analytics',
          description: 'Satellite data, modeling, and research methods',
          progress: 75,
          mastery: 78,
          icon: '📊',
          lessons: 22,
          questions: 95,
          assignments: 18,
          completion: 75
        }
      ]
    };
    
    return curriculumData[sessionId] || [];
  };

  const livebooks = getSessionLivebooks(selectedSession);

  const sessions = [
    { id: 1, name: 'Session 1', colors: ['#f59e0b', '#fbbf24', '#fcd34d'] },
    { id: 2, name: 'Session 2', colors: ['#f87171', '#fca5a5', '#fecaca'] },
    { id: 3, name: 'Session 3', colors: ['#a78bfa', '#c4b5fd', '#ddd6fe'], current: true }
  ];

  // If a module is selected, show the detailed learning module
  if (selectedModule) {
    return (
      <LearningModule 
        moduleData={selectedModule}
        onBack={() => setSelectedModule(null)}
      />
    );
  }

  return (
    <div className="livebooks-page">
      {/* Header */}
      <div className="livebooks-header">
        <div className="header-left">
          <div className="logo-section">
            <div className="logo-icon">📚</div>
            <h1 className="page-title">Livebooks</h1>
          </div>
          <div className="search-section">
            <input 
              type="text" 
              placeholder="Search livebooks..." 
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
        <div className="header-right">
          <span className="ctrl-k">Ctrl+K</span>
        </div>
      </div>

      {/* Session Navigation */}
      <div className="session-nav">
        {sessions.map((session) => (
          <div 
            key={session.id}
            className={`session-item ${selectedSession === session.id ? 'active' : ''}`}
            onClick={() => setSelectedSession(session.id)}
          >
            <div className="session-indicator">
              {session.current && <span className="current-badge">Current</span>}
            </div>
            <span className="session-name">{session.name}</span>
            <div className="session-circles">
              <div className="circle" style={{ backgroundColor: session.colors[0] }}></div>
              <div className="circle" style={{ backgroundColor: session.colors[1] }}></div>
              <div className="circle" style={{ backgroundColor: session.colors[2] }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Current Session Display */}
      <div className="current-session">
        <h2 className="session-title">Session {selectedSession}</h2>
      </div>

      {/* Livebooks Grid */}
      <div className="livebooks-grid">
        {livebooks.map((book) => (
          <div 
            key={book.id} 
            className="livebook-card"
            onClick={() => setSelectedModule(book)}
          >
            <div className="card-header">
              <div className="book-icon">
                {book.icon}
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
              </div>
            </div>
            
            <div className="progress-section">
              <div className="progress-item">
                <div className="progress-label">
                  <span className="progress-icon">📖</span>
                  <span>Progress: {book.completion}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${book.completion}%`, 
                      background: book.completion >= 70 ? 'linear-gradient(90deg, #10b981, #059669)' : 
                                 book.completion >= 40 ? 'linear-gradient(90deg, #f59e0b, #d97706)' : 
                                 'linear-gradient(90deg, #64748b, #475569)'
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="progress-item">
                <div className="progress-label">
                  <span className="progress-icon">🎯</span>
                  <span>Mastery: {book.completion >= 90 ? '93' : book.completion >= 70 ? '75' : '53'}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${book.completion >= 90 ? '93' : book.completion >= 70 ? '75' : '53'}%`, 
                      background: 'linear-gradient(90deg, #00d4ff, #0ea5e9)'
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="card-stats">
              <div className="stat-item">
                <span className="stat-icon">📝</span>
                <span className="stat-number">{book.lessons}</span>
                <span className="stat-label">Lessons</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">❓</span>
                <span className="stat-number">{book.questions}</span>
                <span className="stat-label">Questions</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📋</span>
                <span className="stat-number">{book.assignments}</span>
                <span className="stat-label">Assignments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Livebooks;