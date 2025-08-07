import Header from '../../components/Student/Header/Header'
import Footer from '../../components/Student/Footer/Footer'
import imgUser from '/user-teacher.svg'
import imgCourse from '/icon_courses.svg'
import imgPeople from '/people.svg'
import imgReview from '/customer-reviews.svg'
import imgProfile from '/line-profile.svg'
import heroCourse from '/hero-course.svg'
import lineHeroUp from '/hero-line-up.svg'
import imgCard from '/img-card.svg'
import './Course.css'
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Course = () => {
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

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading course...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main>
          <div className="error-container">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Header />
        <main>
          <div className="error-container">
            <h2>Course not found</h2>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className="hero-course">
          <h1 className='hero-title'>{data.title}</h1>
          <div className="hero-course-container">
            <div className="hero-course-info">
              <div className='hero-course-cover'>
                <img className='hero-course-cover-img' src={`https://devkingsbackend-production-3753.up.railway.app/${data.thumbnail}` || heroCourse} alt="" />
                <div className='hero-cover-info-shape'>
                  <div className="hero-cover-info-tea">
                    <div className='students-profile-card-head'>
                      <img src={data.teacherId.profilePic || imgUser} alt="" />
                      <div>
                        <h1>{data.teacherId.firstName + ' ' + data.teacherId.lastName}</h1>
                        <p><span>{data.teacherId.publisher}, </span><span>{data.category}</span></p>
                      </div>
                    </div>
                    <img src={lineHeroUp} alt="" />
                    <div className='hero-cat-info-heart'>
                      <div className='hero-cat-info-course'>
                        <div>
                          <span className='hero-cat-info-key'>Category:</span>
                          <span className='hero-cat-info-value'>{data.category}</span>
                        </div>
                        <div>
                          <span className='hero-cat-info-key'>Level:</span>
                          <span className='hero-cat-info-value'>{data.level || 'Beginner'}</span>
                        </div>
                        <div>
                          <span className='hero-cat-info-key'>Duration:</span>
                          <span className='hero-cat-info-value'>{data.duration || 'N/A'} hours</span>
                        </div>
                        <div>
                          <span className='hero-cat-info-key'>Price:</span>
                          <span className='hero-cat-info-value'>${data.price || 0}</span>
                        </div>
                      </div>
                      <svg width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="39" height="37" rx="6.5" fill="#F0F8FF" />
                        <rect x="0.5" y="0.5" width="39" height="37" rx="6.5" stroke="#6A6A6A" />
                        <path d="M20 12.1699L19.4219 12.7257C19.5732 12.8827 19.7819 12.9714 20 12.9714C20.2181 12.9714 20.4268 12.8827 20.5781 12.7257L20 12.1699ZM14.6518 23.8395C14.3097 23.5583 13.804 23.6073 13.5225 23.9491C13.2409 24.2908 13.29 24.7959 13.6321 25.0772L14.6518 23.8395ZM9.66818 20.6236C9.88079 21.012 10.3683 21.1546 10.7571 20.9422C11.1459 20.7297 11.2886 20.2428 11.076 19.8544L9.66818 20.6236ZM10.1047 16.0559C10.1047 13.7575 11.4048 11.83 13.1795 11.0196C14.9037 10.2323 17.2204 10.4408 19.4219 12.7257L20.5781 11.6141C17.9658 8.90302 14.9337 8.4562 12.5124 9.56176C10.1418 10.6442 8.5 13.1577 8.5 16.0559H10.1047ZM16.2531 27.1298C16.801 27.5613 17.3893 28.0215 17.9854 28.3694C18.5814 28.7172 19.2614 29 20 29V27.3971C19.6688 27.3971 19.2791 27.2681 18.795 26.9854C18.3112 26.703 17.8092 26.3141 17.2465 25.871L16.2531 27.1298ZM23.747 27.1298C25.2731 25.9279 27.2239 24.5509 28.7542 22.8296C30.312 21.0774 31.5 18.9043 31.5 16.0559H29.8953C29.8953 18.4041 28.9334 20.214 27.5544 21.7652C26.1478 23.3473 24.3749 24.5942 22.7536 25.871L23.747 27.1298ZM31.5 16.0559C31.5 13.1577 29.8582 10.6442 27.4875 9.56176C25.0663 8.4562 22.0342 8.90302 19.4219 11.6141L20.5781 12.7257C22.7796 10.4408 25.0963 10.2323 26.8204 11.0196C28.5952 11.83 29.8953 13.7575 29.8953 16.0559H31.5ZM22.7536 25.871C22.1908 26.3141 21.6888 26.703 21.205 26.9854C20.7209 27.2681 20.3312 27.3971 20 27.3971V29C20.7386 29 21.4186 28.7172 22.0146 28.3694C22.6108 28.0215 23.1989 27.5613 23.747 27.1298L22.7536 25.871ZM17.2465 25.871C16.395 25.2005 15.5298 24.5613 14.6518 23.8395L13.6321 25.0772C14.5203 25.8074 15.4585 26.5041 16.2531 27.1298L17.2465 25.871ZM11.076 19.8544C10.4756 18.7579 10.1047 17.5159 10.1047 16.0559H8.5C8.5 17.8058 8.94925 19.3105 9.66818 20.6236L11.076 19.8544Z" fill="#6A6A6A" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-teacher-info">
              <div className="student-profile-card">
                <div className='students-profile-card-bio'>
                  <div className='students-profile-card-head'>
                    <img src={data.teacherId.avatar || imgUser} alt="" />
                    <div>
                      <h1>{data.teacherId.firstName + ' ' + data.teacherId.lastName}</h1>
                      <p><span>{data.teacherId.publisher}, </span><span>{data.category}</span></p>
                    </div>
                  </div>
                  <div className='students-profile-card-body'>{data.teacherId.bio || 'No bio available'}</div>
                </div>
                <img src={imgProfile} alt="" />
                <div className='students-profile-card-performance'>
                  <div className="card-performance">
                    <img src={imgCourse} alt="" />
                    <div className='count'>{data.teacherId.courses || 0}</div>
                    <div className='title'>Courses</div>
                  </div>
                  <div className="card-performance">
                    <img src={imgPeople} alt="" />
                    <div className='count'>{data.enrolledCount || 0}</div>
                    <div className='title'>Students</div>
                  </div>
                  <div className="card-performance">
                    <img src={imgReview} alt="" />
                    <div className='count'>{data.teacherId.reviews || 0}</div>
                    <div className='title'>Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='descrpition-course'>
          <h1>Description:</h1>
          <div>{data.description}</div>
        </section>
        <section className='student-profile-courses'>
          <h1>Lessons:</h1>
          <div className="courses-profile-cards">
            {data.lessons.map(lesson => (
              <div key={lesson._id} className="course-profile-card">
                <div className="head-card">
                  <img src={imgCard} alt="" />
                </div>
                <div className="body-card">
                  <h1>{lesson.title}</h1>
                  <div className='content-card-head'>
                    <div className='body-card-head-cat'>{data.category}</div>
                    <div className='body-card-head-line'></div>
                    <div className='body-card-head-name'>{data.teacherId.firstName + ' ' + data.teacherId.lastName}</div>
                  </div>
                  <div className='body-card-body'>
                    <div className='body-card-body-performance'>
                      <div className='body-card-level'>{lesson.level || 'Beginner'}</div>
                      <div className='body-card-progress'>{lesson.progress || 0}%</div>
                    </div>
                    <div className='body-card-body-progress'>
                      <progress id="file" value={lesson.progress || 0} max="100"> {lesson.progress || 0}% </progress>
                    </div>
                    <div className='body-card-body-description'>
                      <p>{lesson.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className='certification-course'>
          <h1>Certification Notice:</h1>
          <div>Completed Course For get Certification</div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Course