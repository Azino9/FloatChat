import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "👋 Hello! I'm FloatChat, your AI ocean data assistant. Try asking me about ocean temperatures, salinity, or ARGO float data!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const exampleQueries = [
    "Show sea surface temperature in the Indian Ocean (2020–2024)",
    "What is the average salinity at 1000m depth in Pacific Ocean?",
    "Display temperature profiles near Australia last month"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response with delay
    setTimeout(() => {
      const botResponse = generateMockResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMockResponse = (query) => {
    let response = "";
    
    if (query.toLowerCase().includes('temperature')) {
      response = "🌡️ I found temperature data for your query! The average sea surface temperature in the Indian Ocean from 2020-2024 was 26.8°C, with seasonal variations ranging from 24.2°C to 29.1°C. The warmest regions are near the equator, while cooler temperatures are observed in the southern regions.\\n\\n📊 *Chart: Temperature trends over time*\\n🗺️ *Map: Spatial temperature distribution*";
    } else if (query.toLowerCase().includes('salinity')) {
      response = "🧂 Salinity data retrieved! At 1000m depth in the Pacific Ocean, the average salinity is 34.6‰. This depth typically shows more stable salinity values compared to surface waters. The North Pacific tends to have slightly lower salinity (34.3‰) while the South Pacific shows higher values (34.8‰).\\n\\n📈 *Depth profile: Salinity vs Depth*\\n🌊 *3D visualization available*";
    } else if (query.toLowerCase().includes('profile')) {
      response = "📍 Temperature profiles near Australia retrieved! I found 47 ARGO floats in the region last month. Surface temperatures ranged from 18°C to 24°C, with a thermocline depth averaging 150m. Notable warming trend observed in coastal waters.\\n\\n🔍 *Interactive map with float locations*\\n📊 *Vertical temperature profiles*";
    } else {
      response = "🤖 I understand you're looking for ocean data insights! I can help you with:\\n\\n• Temperature and salinity profiles\\n• ARGO float locations and data\\n• Time-series analysis\\n• Regional ocean conditions\\n• Depth-specific measurements\\n\\nTry asking about specific parameters, regions, or time periods!";
    }

    return {
      id: Date.now() + 1,
      type: 'bot',
      text: response,
      timestamp: new Date()
    };
  };

  const handleExampleClick = (example) => {
    setInputValue(example);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-interface">
      {/* Messages Container */}
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-avatar">
              {message.type === 'bot' ? '🤖' : '👤'}
            </div>
            <div className="message-content">
              <div className="message-text">
                {message.text.split('\\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < message.text.split('\\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Example Queries */}
      <div className="example-queries">
        <div className="examples-label">💡 Try these examples:</div>
        <div className="examples-grid">
          {exampleQueries.map((example, index) => (
            <button
              key={index}
              className="example-button"
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about ocean data..."
            className="message-input"
            rows="1"
          />
          <button 
            onClick={handleSendMessage}
            className="send-button"
            disabled={!inputValue.trim()}
          >
            🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;