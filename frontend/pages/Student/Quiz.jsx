import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Student/Header/Header';
import Footer from '../../components/Student/Footer/Footer';
import axios from 'axios';
import './Quiz.css';

const Modal = ({ isOpen, onClose, score, totalQuestions }) => {
  if (!isOpen) return null;
  
  const scorePercentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Quiz Results</h2>
        <div className="modal-score">
          <span className="score-text">Score:</span>
          <span className="score-value">{score} / {totalQuestions}</span>
          <span className="score-percentage">({scorePercentage}%)</span>
        </div>
        <button onClick={onClose} className="modal-close-btn">Close</button>
      </div>
    </div>
  );
};

const Quiz = () => {
  const { tutorialId } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [submissionScore, setSubmissionScore] = useState(null);
  const [submissionTotal, setSubmissionTotal] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) throw new Error('Not authenticated');
        const res = await fetch(`https://devkingsbackend-production-3753.up.railway.app/api/student/quizzes/${tutorialId}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Failed to fetch quiz');
        }
        const data = await res.json();
        setQuizData(data);
        setAnswers(Array(data.quiz.questions.length).fill(null));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [tutorialId]);

  const handleOptionChange = (qIdx, optIdx) => {
    const updated = [...answers];
    updated[qIdx] = optIdx;
    setAnswers(updated);
    // Update progress when an answer is selected
    const correctCount = quizData?.quiz?.questions.filter((q, idx) => 
      updated[idx] !== null && q.options[updated[idx]] === q.correctAnswer
    ).length;
    const total = quizData?.quiz?.questions.length || 0;
    const PERCENT = Math.round((correctCount / total) * 100);
  };

  const handleNext = () => {
    if (current < quizData.quiz.questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error('Not authenticated');

      // Prepare answers array for backend
      const answersArray = quizData.quiz.questions.map((q, i) => {
        return answers[i] !== null ? q.options[answers[i]] : null;
      });

      // Submit to backend
      const response = await axios.post(
        `https://devkingsbackend-production-3753.up.railway.app/api/student/quizzes/${tutorialId}/submit`,
        { answers: answersArray },
        {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      );

      // Store submission results
      const { score, totalQuestions } = response.data;
      setSubmissionScore(score);
      setSubmissionTotal(totalQuestions);
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="quiz-root">
        <Header />
        <div className="loading-state"><h2>Loading quiz...</h2></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="quiz-root">
        <Header />
        <div className="error-state"><h2>Error: {error}</h2></div>
      </div>
    );
  }
  if (!quizData) {
    return (
      <div className="quiz-root">
        <Header />
        <div className="error-state"><h2>Quiz not found</h2></div>
      </div>
    );
  }

  const { quiz } = quizData;
  const { title, description, questions } = quiz || {};
  const teacher = quizData.teacher;
  const answeredCount = answers.filter(a => a !== null).length;
  const total = questions.length;
  const PERCENT = Math.round((answeredCount / total) * 100);

  return (
    <>
      <Header />
      <div className="quiz-root">
        <div className="quiz-header">
          <h1>{title || 'Quiz Title'}</h1>
          <div className="quiz-meta">
            <span className="quiz-tag">Quiz</span>
            <span className="quiz-teacher">— {teacher || 'Teacher Name'}</span>
          </div>
        </div>
        <div className="quiz-description">{description}</div>
        <div className="quiz-question-card">
          <div className="quiz-question-title">{questions[current].question}</div>
          <div className="quiz-options">
            {questions[current].options.map((opt, idx) => {
              const isCorrect = opt === questions[current].correctAnswer;
              const isSelected = answers[current] === idx;
              const hasAnswered = answers[current] !== null;
              
              return (
                <label
                  key={idx}
                  className={`quiz-option ${
                    isSelected ? (isCorrect ? 'correct' : 'incorrect') : (hasAnswered ? 'answered' : '')
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${current}`}
                    checked={isSelected}
                    onChange={() => handleOptionChange(current, idx)}
                    disabled={hasAnswered}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
          {answers[current] !== null && (
            <div className="quiz-feedback">
              {questions[current].options[answers[current]] === questions[current].correctAnswer ? (
                <span className="quiz-correct">Correct!</span>
              ) : (
                <span className="quiz-incorrect">Incorrect</span>
              )}
            </div>
          )}
        </div>
        <div className="quiz-nav">
          <button onClick={handlePrev} disabled={current === 0} className="quiz-nav-btn">Prev</button>
          {current < quizData.quiz.questions.length - 1 ? (
            <button onClick={handleNext} className="quiz-nav-btn quiz-next-btn">Next Quiz</button>
          ) : (
            <button onClick={handleSubmit} className="quiz-nav-btn quiz-next-btn">Submit</button>
          )}
        </div>
        <div className="quiz-progress-section">
          <div className="quiz-progress-bar">
            <progress className="quiz-progress-bar" value={PERCENT} max="100"></progress>
            <div className="quiz-progress-fill" style={{ width: `${PERCENT}%` }}>{PERCENT}%</div>
            <div className="quiz-progress-placeholder">{PERCENT}% Completed</div>
          </div>
        </div>
        <div className="quiz-stepper">
          {quizData.quiz.questions.map((q, idx) => (
            <span
              key={idx}
              className={`quiz-step ${idx === current ? 'active' : ''} ${answers[idx] !== null ? 'answered' : ''}`}
              onClick={() => setCurrent(idx)}
            >
              {idx + 1}
            </span>
          ))}
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={showResults}
        onClose={() => {
          setShowResults(false);
          navigate(`/course/${tutorialId}`);
        }}
        score={submissionScore}
        totalQuestions={submissionTotal}
      />
    </>
  );
};

export default Quiz;
