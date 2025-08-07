import React, { useState, useEffect } from 'react';
import './CourseDetail.css';
import imgCourse from '/course-img.svg';
import Header from '../../components/Student/Header/Header';
import Footer from '../../components/Student/Footer/Footer';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const { tutorialId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Not authenticated');
        }

        const response = await fetch(`https://devkingsbackend-production-3753.up.railway.app/api/student/tutorials/${tutorialId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          credentials: 'include'
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch course');
        }
        
        const result = await response.json();
        console.log(result)
        setData(result.tutorial);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [tutorialId]);

  const handleLessonClick = async () => {
    try {
      const response = await axios.post(
        `https://devkingsbackend-production-3753.up.railway.app/api/student/enroll-tutorial/${tutorialId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );
      console.log(response.data.message);
      // alert(response.data.message);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      // alert(error.response?.data?.message || 'Failed to enroll in tutorial');
      // alert(error.response?.data?.message || 'Failed to enroll in tutorial');
    }
  }

  if (loading) {
    return (
      <div className="course-detail-root">
        <Header />
        <div className="loading-state">
          <h2>Loading course details...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-detail-root">
        <Header />
        <div className="error-state">
          <h2>Error: {error}</h2>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="course-detail-root">
        <Header />
        <div className="error-state">
          <h2>Course not found</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="course-detail-root">
        <div className="course-header" style={{ marginTop: '2rem' }}>
          <h1>{data.title}</h1>
        </div>

        <div className="course-main">
          <div className="course-image-card">
            <img 
              src={`https://devkingsbackend-production-3753.up.railway.app/${data.thumbnail}`}
              alt="Course" 
              className="course-image" 
            />
            {/* <button className="favorite-btn">
              <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button> */}
            <div className="teacher-overlay">
              <div className="teacher-info-header">
                <img 
                  // src={data.teacherId.avatar}
                  // src={data.}
                  src={imgCourse}
                  alt="Teacher" 
                  className="teacher-avatar" 
                />
                <div className="teacher-details">
                  <h3>{data.teacherId.firstName + ' ' + data.teacherId.lastName}</h3>
                  <p>{data.teacherId.profile}</p>
                </div>
              </div>
              <div className="course-stats">
                <div className="stat-item">
                  <span className="stat-label">Category</span>
                  <span className="stat-value">{data.category}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Price</span>
                  <span className="stat-value">{data.price}$</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Videos</span>
                  <span className="stat-value">{data.lessons.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Views</span>
                  <span className="stat-value">{data.enrolledCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="description-card" style={{ background: "none", boxShadow: "none" }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Description:</h2>
            <p>{data.description}</p>
          </div>
        </div>

        <div className="lessons-section">
          <div className="lessons-header">
            <h2>Lessons:</h2>
          </div>
          <div className="lessons-list">
            {data.lessons.map(lesson => (
              <div key={lesson._id} className="lesson-card">
                <div className="lesson-content">
                  <h3 style={{ padding: '1.5rem 0' }}>{lesson.title}</h3>
                  <div className="lesson-views" style={{ paddingBottom: '1.5rem' }}>
                    {data.enrolledCount} Watched
                  </div>
                  <p className="lesson-description">{lesson.description}</p>
                </div>
                <div className="lesson-course-card">
                  <img 
                    src={imgCourse} 
                    // src={data.thumbnail} 
                    alt="Lesson" 
                    className="lesson-course-image" 
                  />
                  <div className="lesson-course-content">
                    <div className="lesson-course-header">
                      <h4 className="lesson-course-title">{data.title}</h4>
                      <span className="lesson-course-duration">{data.price}$</span>
                    </div>
                    <p className="lesson-course-teacher">{data.teacherId.firstName + ' ' + data.teacherId.lastName}</p>
                    <div className="progress-section">
                      <div className="progress-info">
                        <span>0%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    <div className="lesson-course-footer">
                      <Link to={`/lesson/${lesson._id}`}>
                        <button className="btn-start" onClick={() => handleLessonClick()}>Start Now</button>
                      </Link>
                      <span className="completion-status">It's not completed yet</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;