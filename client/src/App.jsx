import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AboutUs from './pages/AboutUs'
import LearningMode from './components/LearningMode'
import ResearchHub from './components/ResearchHub'
import OceanCommunity from './components/OceanCommunity'
import './styles/global.css'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/learning" element={<LearningMode />} />
          <Route path="/research" element={<ResearchHub />} />
          <Route path="/community" element={<OceanCommunity />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
