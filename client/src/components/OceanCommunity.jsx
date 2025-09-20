import React, { useState } from 'react';
import { communityData } from '../data/communityData';

const OceanCommunity = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newMessage, setNewMessage] = useState('');

  const tabs = [
    { id: 'news', label: 'Ocean News', icon: '📰' },
    { id: 'chat', label: 'Community Chat', icon: '💬' },
    { id: 'policies', label: 'Policies & Laws', icon: '⚖️' }
  ];

  const filteredNews = communityData.news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const filteredPolicies = communityData.policies.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['all', ...new Set(communityData.news.map(item => item.category))];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send to backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          🌊 Ocean Community Hub
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-2 flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder={`Search ${activeTab === 'news' ? 'news articles' : activeTab === 'policies' ? 'policies' : 'messages'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {activeTab === 'news' && (
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Latest Ocean News</h2>
            {filteredNews.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-gray-600 mb-3">{article.summary}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📅 {article.date}</span>
                        <span>✍️ {article.author}</span>
                        <span>⏱️ {article.readTime}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      article.category === 'Discovery' ? 'bg-purple-100 text-purple-700' :
                      article.category === 'Technology' ? 'bg-blue-100 text-blue-700' :
                      article.category === 'Conservation' ? 'bg-green-100 text-green-700' :
                      article.category === 'Economy' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {article.category}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <details className="cursor-pointer">
                      <summary className="text-blue-600 hover:text-blue-800 font-medium">
                        Read Full Article
                      </summary>
                      <div className="mt-4 text-gray-700 leading-relaxed">
                        {article.content}
                      </div>
                    </details>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Messages */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">Community Discussion</h2>
                <p className="text-gray-600">Connect with ocean researchers worldwide</p>
              </div>
              
              <div className="p-6 h-96 overflow-y-auto space-y-4">
                {communityData.chatMessages.map((message) => (
                  <div key={message.id} className="flex space-x-3">
                    <div className="text-2xl">{message.avatar}</div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-900">{message.user}</h4>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{message.message}</p>
                      <div className="flex space-x-4 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-blue-600">
                          <span>❤️</span>
                          <span>{message.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-600">
                          <span>💬</span>
                          <span>{message.replies} replies</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Share your research insights..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Members</span>
                    <span className="font-bold text-blue-600">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Research Papers</span>
                    <span className="font-bold text-green-600">1,293</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Data Contributions</span>
                    <span className="font-bold text-purple-600">45,672</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Countries</span>
                    <span className="font-bold text-orange-600">67</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Dr. Oceanic', contributions: 342, avatar: '🌊' },
                    { name: 'Marine_Researcher_IN', contributions: 298, avatar: '🔬' },
                    { name: 'CoralGuardian', contributions: 276, avatar: '🪸' },
                    { name: 'DeepSeaExplorer', contributions: 251, avatar: '🐙' }
                  ].map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{contributor.avatar}</span>
                        <span className="font-medium text-gray-900">{contributor.name}</span>
                      </div>
                      <span className="text-sm font-bold text-blue-600">{contributor.contributions}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Ocean Policies & Maritime Laws</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPolicies.map((policy) => (
                <div key={policy.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{policy.title}</h3>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        policy.type === 'International' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {policy.type}
                      </span>
                      <span className="text-sm text-gray-500">{policy.year}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{policy.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Points:</h4>
                    <ul className="space-y-1">
                      {policy.keyPoints.slice(0, 3).map((point, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    {policy.keyPoints.length > 3 && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-blue-600 text-sm hover:text-blue-800">
                          Show {policy.keyPoints.length - 3} more points
                        </summary>
                        <ul className="mt-2 space-y-1">
                          {policy.keyPoints.slice(3).map((point, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Relevance: {policy.relevance}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        policy.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {policy.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OceanCommunity;