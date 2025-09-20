import React, { useState } from 'react';
import './LearningModule.css';

const LearningModule = ({ moduleData, onBack }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  // Sample learning module data
  const sampleModule = {
    title: 'Marine Biology & Ecosystems',
    icon: '🐋',
    color: '#22d3ee',
    description: 'Comprehensive study of marine life and ocean ecosystems',
    progress: 85,
    mastery: 92,
    topics: [
      {
        id: 1,
        title: 'Marine Ecosystem Fundamentals',
        lessons: [
          {
            id: 11,
            title: 'Introduction to Marine Ecosystems',
            type: 'lesson',
            content: 'Understanding the basics of marine ecosystems...',
            completed: true
          },
          {
            id: 12,
            title: 'Ocean Zones and Habitats',
            type: 'lesson', 
            content: 'Exploring different ocean zones...',
            completed: true
          },
          {
            id: 13,
            title: 'Marine Food Chains',
            type: 'lesson',
            content: 'How energy flows through marine ecosystems...',
            completed: false
          }
        ]
      },
      {
        id: 2,
        title: 'Marine Animals and Classification',
        lessons: [
          {
            id: 21,
            title: 'Marine Mammals',
            type: 'lesson',
            content: 'Whales, dolphins, and marine mammals...',
            completed: true
          },
          {
            id: 22,
            title: 'Fish Species and Behavior',
            type: 'lesson',
            content: 'Understanding fish diversity...',
            completed: false
          },
          {
            id: 23,
            title: 'Marine Invertebrates',
            type: 'lesson',
            content: 'Coral, jellyfish, and other invertebrates...',
            completed: false
          }
        ]
      },
      {
        id: 3,
        title: 'Marine Plants and Algae',
        lessons: [
          {
            id: 31,
            title: 'Seaweeds and Kelp Forests',
            type: 'lesson',
            content: 'Marine plant communities...',
            completed: false
          },
          {
            id: 32,
            title: 'Phytoplankton and Primary Production',
            type: 'lesson',
            content: 'Microscopic marine plants...',
            completed: false
          }
        ]
      }
    ],
    quiz: {
      totalQuestions: 55,
      passingScore: 70,
      timeLimit: 90
    },
    assignment: {
      totalMarks: 10,
      type: 'Case Study Analysis',
      deadline: '2025-01-15'
    }
  };

  const module = moduleData || sampleModule;

  if (currentLesson) {
    return (
      <div className="learning-module">
        {/* Lesson View */}
        <div className="lesson-header">
          <button className="back-btn" onClick={() => setCurrentLesson(null)}>
            ← Back to Topics
          </button>
          <div className="lesson-info">
            <h1 className="lesson-title">{currentLesson.title}</h1>
            <span className="lesson-type-badge">{currentLesson.type}</span>
          </div>
        </div>

        <div className="lesson-content">
          <div className="lesson-main">
            <div className="content-card">
              <h3>Lesson Content</h3>
              <p>{currentLesson.content}</p>
              
              <div className="lesson-example">
                <h4>📚 Example</h4>
                <p>Let's consider the coral reef ecosystem as a perfect example of marine biodiversity. Coral reefs support about 25% of all marine species despite covering less than 1% of the ocean floor.</p>
              </div>

              <div className="lesson-technical">
                <h4>🔬 Technical Details</h4>
                <ul>
                  <li><strong>Symbiosis:</strong> The relationship between coral polyps and zooxanthellae algae</li>
                  <li><strong>Calcification:</strong> Process of coral skeleton formation using calcium carbonate</li>
                  <li><strong>Bleaching:</strong> Stress response causing coral to expel symbiotic algae</li>
                </ul>
              </div>

              <div className="lesson-actions">
                <button className="complete-btn">
                  {currentLesson.completed ? '✅ Completed' : '📖 Mark as Complete'}
                </button>
              </div>
            </div>
          </div>

          <div className="lesson-sidebar">
            <div className="revision-notes-card">
              <h4>📝 Revision Notes</h4>
              <textarea 
                placeholder="Add your personal notes here..."
                className="notes-textarea"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedTopic) {
    return (
      <div className="learning-module">
        {/* Topic Detail View */}
        <div className="topic-header">
          <button className="back-btn" onClick={() => setSelectedTopic(null)}>
            ← Back to Module
          </button>
          <div className="topic-info">
            <h1 className="topic-title">{selectedTopic.title}</h1>
            <div className="topic-progress">
              <span>{selectedTopic.lessons.filter(l => l.completed).length} of {selectedTopic.lessons.length} completed</span>
            </div>
          </div>
        </div>

        <div className="lessons-grid">
          {selectedTopic.lessons.map((lesson) => (
            <div 
              key={lesson.id}
              className={`lesson-card ${lesson.completed ? 'completed' : 'pending'}`}
              onClick={() => setCurrentLesson(lesson)}
            >
              <div className="lesson-header">
                <div className="lesson-status">
                  {lesson.completed ? '✅' : '📖'}
                </div>
                <div className="lesson-details">
                  <h3 className="lesson-title">{lesson.title}</h3>
                  <span className="lesson-type">{lesson.type}</span>
                </div>
              </div>
              <p className="lesson-preview">{lesson.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="learning-module">
      {/* Module Overview */}
      <div className="module-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Livebooks
        </button>
        <div className="module-info">
          <div className="module-icon" style={{ color: module.color }}>
            {module.icon}
          </div>
          <div className="module-details">
            <h1 className="module-title">{module.title}</h1>
            <p className="module-description">{module.description}</p>
            <div className="module-progress-bar">
              <div className="progress-text">Overall Progress: {module.progress}%</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${module.progress}%`, backgroundColor: module.color }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path Tabs */}
      <div className="learning-tabs">
        <div className="tab active">
          <span className="tab-icon">🛤️</span>
          Learning Path
        </div>
        <div className="tab">
          <span className="tab-icon">📋</span>
          Assessments
        </div>
        <div className="tab">
          <span className="tab-icon">ℹ️</span>
          About
        </div>
      </div>

      {/* Continue Section */}
      <div className="continue-section">
        <h2>Continue from where you left off</h2>
        <div className="continue-card">
          <div className="continue-number">5</div>
          <div className="continue-info">
            <h3>Marine Food Chains | Energy flow in marine ecosystems</h3>
            <span className="continue-label">Test</span>
          </div>
          <button className="continue-btn">→</button>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="topics-section">
        <h2>Learning Units</h2>
        <div className="topics-grid">
          {module.topics.map((topic) => (
            <div 
              key={topic.id}
              className="topic-card"
              onClick={() => setSelectedTopic(topic)}
            >
              <div className="topic-header">
                <h3 className="topic-title">{topic.title}</h3>
                <span className="topic-number">{topic.id}</span>
              </div>
              <div className="topic-stats">
                <div className="stat">
                  <span className="stat-icon">📚</span>
                  <span>{topic.lessons.length} lessons</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">✅</span>
                  <span>{topic.lessons.filter(l => l.completed).length} completed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment Section */}
      <div className="assessment-section">
        <div className="assessment-card quiz-card">
          <div className="assessment-header">
            <div className="assessment-icon">🧠</div>
            <div className="assessment-info">
              <h3>Module Quiz</h3>
              <p>{module.quiz.totalQuestions} questions • {module.quiz.timeLimit} minutes</p>
            </div>
          </div>
          <div className="assessment-progress">
            <span>Passing Score: {module.quiz.passingScore}%</span>
          </div>
          <button className="assessment-btn quiz-btn">Start Quiz</button>
        </div>

        <div className="assessment-card assignment-card">
          <div className="assessment-header">
            <div className="assessment-icon">📋</div>
            <div className="assessment-info">
              <h3>Module Assignment</h3>
              <p>{module.assignment.type} • {module.assignment.totalMarks} marks</p>
            </div>
          </div>
          <div className="assessment-progress">
            <span>Due: {module.assignment.deadline}</span>
          </div>
          <button className="assessment-btn assignment-btn">View Assignment</button>
        </div>
      </div>
    </div>
  );
};

export default LearningModule;