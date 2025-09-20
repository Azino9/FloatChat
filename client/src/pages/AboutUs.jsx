import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Mohit Samal",
      role: "Team Leader",
      description: "Fullstack Developer specializing in React and Express, leading the technical architecture and development strategy.",
      avatar: "👨‍💻",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      skills: ["React", "Express", "Node.js", "Architecture"],
      icon: "🚀"
    },
    {
      id: 2,
      name: "Sanjay Pandiyan",
      role: "UI/UX Designer",
      description: "UI/UX Designer creating user-friendly interfaces and compelling presentations for stakeholder engagement.",
      avatar: "🎨",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      skills: ["UI/UX", "Design", "Figma", "Prototyping"],
      icon: "✨"
    },
    {
      id: 3,
      name: "C.Balaji",
      role: "Data Visualization Specialist",
      description: "Data Visualization Specialist creating intuitive maps, charts, and interactive graphics for ocean data.",
      avatar: "📊",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      skills: ["D3.js", "Charts", "Maps", "Analytics"],
      icon: "📈"
    },
    {
      id: 4,
      name: "Kaviraja",
      role: "AI/ML Engineer",
      description: "AI/ML Engineer developing the conversational engine and natural language processing capabilities.",
      avatar: "🤖",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      skills: ["Python", "NLP", "TensorFlow", "AI/ML"],
      icon: "🧠"
    },
    {
      id: 5,
      name: "Minha",
      role: "Research & Documentation Specialist",
      description: "Research & Documentation Specialist ensuring scientific accuracy and comprehensive project documentation.",
      avatar: "📚",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      skills: ["Research", "Documentation", "Analysis", "Writing"],
      icon: "🔍"
    },
    {
      id: 6,
      name: "Bhavani Prasad",
      role: "Backend & API Integration Expert",
      description: "Backend & API Integration Expert, ensuring seamless data connectivity and robust server performance.",
      avatar: "⚙️",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      skills: ["APIs", "Backend", "Integration", "Performance"],
      icon: "🔧"
    }
  ];

  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-background">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Meet Our Expert Team
            <span className="title-wave">🌊</span>
          </h1>
          <p className="hero-subtitle">
            We are a passionate and multidisciplinary team dedicated to building 
            innovative AI-powered ocean solutions
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className="team-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-inner">
                {/* Front of card */}
                <div className="card-front">
                  <div 
                    className="member-avatar"
                    style={{ background: member.gradient }}
                  >
                    <span className="avatar-emoji">{member.avatar}</span>
                    <div className="avatar-glow"></div>
                  </div>
                  
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <div className="role-icon">{member.icon}</div>
                  </div>
                  
                  <div className="card-hover-indicator">
                    <span>Hover for details</span>
                    <div className="hover-arrow">→</div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="card-back">
                  <div className="member-description">
                    <h4 className="description-title">Expertise</h4>
                    <p>{member.description}</p>
                    
                    <div className="skills-section">
                      <h5>Key Skills</h5>
                      <div className="skills-list">
                        {member.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <h2 className="mission-title">
              <span className="mission-icon">🎯</span>
              Our Mission
            </h2>
            <p className="mission-description">
              Together, we combine expertise in <strong>fullstack development, AI/ML, 
              data visualization, research, and system integration</strong> to deliver 
              cutting-edge conversational ocean intelligence tools that empower 
              researchers, educators, and communities worldwide.
            </p>
            
            <div className="mission-stats">
              <div className="stat-item">
                <div className="stat-number">6</div>
                <div className="stat-label">Expert Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">∞</div>
                <div className="stat-label">Ocean Possibilities</div>
              </div>
            </div>
          </div>
          
          <div className="mission-visual">
            <div className="globe-container">
              <div className="globe">
                <div className="globe-inner">
                  <span className="globe-emoji">🌍</span>
                </div>
                <div className="orbit orbit1">
                  <div className="satellite">💻</div>
                </div>
                <div className="orbit orbit2">
                  <div className="satellite">🤖</div>
                </div>
                <div className="orbit orbit3">
                  <div className="satellite">📊</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <h2 className="values-title">Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🚀</div>
            <h3>Innovation</h3>
            <p>Pushing boundaries with cutting-edge AI and ocean technology</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Collaboration</h3>
            <p>Working together to solve complex oceanographic challenges</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🌊</div>
            <h3>Sustainability</h3>
            <p>Protecting our oceans for future generations through technology</p>
          </div>
          <div className="value-card">
            <div className="value-icon">📚</div>
            <h3>Education</h3>
            <p>Empowering researchers and communities with accessible tools</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;