import React, { useState, useEffect } from 'react';
import './Lesson.css';
import Header from '../../components/Student/Header/Header';
import Footer from '../../components/Student/Footer/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const Lesson = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [prevLesson, setPrevLesson] = useState(null);
    const [nextLesson, setNextLesson] = useState(null);

    useEffect(() => {
        // Add lesson-page body class for background
        document.body.classList.add('lesson-page');
        return () => document.body.classList.remove('lesson-page');
    }, []);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                setLoading(true);
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) throw new Error('Not authenticated');
                // Fetch lesson details
                const lessonRes = await fetch(`https://devkingsbackend-production-3753.up.railway.app/api/student/lessons/${lessonId}`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                if (!lessonRes.ok) {
                    const errData = await lessonRes.json();
                    throw new Error(errData.message || 'Failed to fetch lesson');
                }
                const lessonData = await lessonRes.json();
                setLesson(lessonData.lesson);
                setPrevLesson(lessonData.prevLesson);
                setNextLesson(lessonData.nextLesson);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [lessonId]);

    if (loading) {
        return (
            <div className="lesson-root">
                <Header />
                <div className="loading-state">
                    <h2>Loading lesson...</h2>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="lesson-root">
                <Header />
                <div className="error-state">
                    <h2>Error: {error}</h2>
                </div>
            </div>
        );
    }
    if (!lesson) {
        return (
            <div className="lesson-root">
                <Header />
                <div className="error-state">
                    <h2>Lesson not found</h2>
                </div>
            </div>
        );
    }

    // Navigation handlers
    const handlePrev = () => {
        if (prevLesson) {
            navigate(`/lesson/${prevLesson._id}`);
        }
    };

    const handleQuiz = () => {
        navigate(`/quiz/${lesson.tutorialId}`);
    };

    const handleNext = () => {
        if (nextLesson) {
            navigate(`/lesson/${nextLesson._id}`);
        }
    };

    return (
        <>
            <Header />
            <div className="lesson-root">
                <div className="lesson-header">
                    <h1>{lesson.title}</h1>
                </div>
                <div className="lesson-media">
                    {lesson.videoUrl ? (
                        <video
                            src={`https://devkingsbackend-production-3753.up.railway.app/${lesson.videoUrl}`}
                            controls
                            poster={lesson.thumbnail}
                        />
                    ) : 
                        <iframe
                            width="1150"
                            height="500"
                            src="https://www.youtube.com/embed/RURwSY7mktQ?si=5EtEkaloABE5lyvd"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                            style={{
                                borderRadius: "14px",
                                border: "1px solid #f0f8ff",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                            }}
                        ></iframe>
                    }
                </div>
                <div className="lesson-description-card">
                    <h2>Description:</h2>
                    <p>{lesson.description}</p>
                </div>
                <div className="lesson-nav">
                    <button
                        className="btn-prev-lesson"
                        onClick={handlePrev}
                        disabled={!prevLesson}
                    >
                        Prev Lesson
                    </button>
                    {nextLesson ? (
                        <button
                            className="btn-next-lesson"
                            onClick={handleNext}
                        >
                            Next Lesson
                        </button>
                    ) : (
                        <button
                            className="btn-next-lesson"
                            onClick={handleQuiz}
                        >
                            Take Quiz
                        </button>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Lesson;
