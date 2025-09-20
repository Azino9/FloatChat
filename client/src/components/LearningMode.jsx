import React, { useState } from 'react';
import { learningCategories } from '../data/learningData';

const LearningMode = () => {
  const [selectedCategory, setSelectedCategory] = useState('Marine Life');
  const [selectedUnit, setSelectedUnit] = useState(0);
  const [selectedSubtopic, setSelectedSubtopic] = useState(0);
  const [viewMode, setViewMode] = useState('simple');
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentCategoryData = learningCategories.find(cat => cat.title === selectedCategory);
  const currentUnit = currentCategoryData?.units[selectedUnit];
  const currentSubtopic = currentUnit?.subtopics[selectedSubtopic];

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: answerIndex
    });
  };

  const calculateQuizScore = () => {
    const questions = currentSubtopic?.quiz || [];
    const correctAnswers = questions.filter((q, index) => 
      quizAnswers[index] === q.correctAnswer
    ).length;
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setCurrentQuizIndex(0);
    setQuizAnswers({});
    setShowResults(false);
  };

  const nextQuestion = () => {
    if (currentQuizIndex < (currentSubtopic?.quiz?.length - 1)) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          🎓 Student Learning Mode
        </h1>

        {/* Category Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Choose Learning Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {learningCategories.map((category) => (
              <button
                key={category.title}
                onClick={() => {
                  setSelectedCategory(category.title);
                  setSelectedUnit(0);
                  setSelectedSubtopic(0);
                  setShowQuiz(false);
                }}
                className={`p-4 rounded-lg text-center transition-all ${
                  selectedCategory === category.title
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-100 shadow'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-medium text-sm">{category.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Unit and Subtopic Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Units */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Units</h3>
            <div className="space-y-2">
              {currentCategoryData?.units.map((unit, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedUnit(index);
                    setSelectedSubtopic(0);
                    setShowQuiz(false);
                  }}
                  className={`w-full p-3 text-left rounded-lg transition-all ${
                    selectedUnit === index
                      ? 'bg-blue-100 border-l-4 border-blue-500 text-blue-900'
                      : 'bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="font-medium text-sm">{unit.title}</div>
                  <div className="text-xs text-gray-500">{unit.subtopics?.length || 0} subtopics</div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {!showQuiz ? (
              <>
                {/* Subtopic Selection */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {currentUnit?.title} - Choose Subtopic
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {currentUnit?.subtopics.map((subtopic, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSubtopic(index)}
                        className={`p-3 rounded-lg text-left transition-all ${
                          selectedSubtopic === index
                            ? 'bg-cyan-100 border border-cyan-300 text-cyan-900'
                            : 'bg-white hover:bg-gray-50 text-gray-700 border'
                        }`}
                      >
                        <div className="font-medium text-sm">{subtopic.title}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Display */}
                {currentSubtopic && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-2xl font-bold text-gray-900">
                        {currentSubtopic.title}
                      </h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setViewMode('simple')}
                          className={`px-4 py-2 rounded-lg text-sm ${
                            viewMode === 'simple'
                              ? 'bg-green-100 text-green-800 border border-green-300'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          🟢 Simple
                        </button>
                        <button
                          onClick={() => setViewMode('technical')}
                          className={`px-4 py-2 rounded-lg text-sm ${
                            viewMode === 'technical'
                              ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          🟡 Technical
                        </button>
                        <button
                          onClick={() => setViewMode('examples')}
                          className={`px-4 py-2 rounded-lg text-sm ${
                            viewMode === 'examples'
                              ? 'bg-purple-100 text-purple-800 border border-purple-300'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          🟣 Examples
                        </button>
                      </div>
                    </div>

                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {currentSubtopic.content[viewMode]}
                      </p>
                    </div>

                    {/* Quiz Button */}
                    {currentSubtopic.quiz && currentSubtopic.quiz.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="text-lg font-semibold text-gray-900">
                              Test Your Knowledge
                            </h5>
                            <p className="text-sm text-gray-600">
                              {currentSubtopic.quiz.length} questions available
                            </p>
                          </div>
                          <button
                            onClick={startQuiz}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
                          >
                            📝 Start Quiz
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              /* Quiz Interface */
              <div className="bg-white rounded-lg shadow-md p-6">
                {!showResults ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-2xl font-bold text-gray-900">Quiz Mode</h4>
                      <div className="text-sm text-gray-600">
                        Question {currentQuizIndex + 1} of {currentSubtopic?.quiz?.length}
                      </div>
                    </div>

                    {currentSubtopic?.quiz && (
                      <div className="space-y-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-lg text-gray-900 mb-4">
                            {currentSubtopic.quiz[currentQuizIndex]?.question}
                          </h5>
                          
                          <div className="space-y-3">
                            {currentSubtopic.quiz[currentQuizIndex]?.options.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuizAnswer(currentQuizIndex, index)}
                                className={`w-full p-3 text-left rounded-lg transition-all ${
                                  quizAnswers[currentQuizIndex] === index
                                    ? 'bg-blue-200 border-2 border-blue-400'
                                    : 'bg-white hover:bg-gray-50 border border-gray-300'
                                }`}
                              >
                                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <button
                            onClick={() => setShowQuiz(false)}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                          >
                            ← Back to Content
                          </button>
                          <button
                            onClick={nextQuestion}
                            disabled={quizAnswers[currentQuizIndex] === undefined}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all"
                          >
                            {currentQuizIndex === (currentSubtopic?.quiz?.length - 1) ? 'Finish Quiz' : 'Next Question'} →
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Quiz Results */
                  <div className="text-center space-y-6">
                    <h4 className="text-3xl font-bold text-gray-900">Quiz Complete!</h4>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-lg">
                      <div className="text-6xl font-bold text-blue-600 mb-4">
                        {calculateQuizScore()}%
                      </div>
                      <p className="text-xl text-gray-700">
                        You got {Object.values(quizAnswers).filter((answer, index) => 
                          answer === currentSubtopic?.quiz[index]?.correctAnswer
                        ).length} out of {currentSubtopic?.quiz?.length} questions correct!
                      </p>
                    </div>

                    {/* Detailed Results */}
                    <div className="space-y-4 text-left">
                      <h5 className="text-xl font-semibold text-gray-900">Review Your Answers</h5>
                      {currentSubtopic?.quiz?.map((question, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium text-gray-900 mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <p className={`text-sm ${
                            quizAnswers[index] === question.correctAnswer
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}>
                            Your answer: {question.options[quizAnswers[index]]} {
                              quizAnswers[index] === question.correctAnswer ? '✅' : '❌'
                            }
                          </p>
                          {quizAnswers[index] !== question.correctAnswer && (
                            <p className="text-sm text-green-600">
                              Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                          <p className="text-xs text-gray-600 mt-2">
                            💡 {question.explanation}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setShowQuiz(false)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                      >
                        Back to Content
                      </button>
                      <button
                        onClick={startQuiz}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                      >
                        Retake Quiz
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningMode;