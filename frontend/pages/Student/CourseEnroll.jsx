import Header from '../../components/Student/Header/Header';
import Footer from '../../components/Student/Footer/Footer';
import imgUser from '/user-teacher.svg';
import imgCourse from '/icon_courses.svg';
import imgPeople from '/people.svg';
import imgReview from '/customer-reviews.svg';
import imgProfile from '/line-profile.svg';
// import heroCourse from '/heroCourse.svg';
import lineHeroUp from '/hero-line-up.svg';
import lineHeroDown from '/hero-line-down.svg';
import styles from './CourseEnroll.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../layouts/Student/Layout';

const CourseEnroll = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [course, setCourse] = useState(null);
  const { courseId } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`https://devkingsbackend-production-3753.up.railway.app/api/public/course/${courseId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include'
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || 'Failed to fetch course data');
        }
        const data = await res.json();
        console.log(data);
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return null;

  const handleEnrollClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user')
    console.log(user);
    console.log("hello")
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      console.log(courseId)
      const res = await fetch(`https://devkingsbackend-production-3753.up.railway.app/api/student/is-enrolled/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json();
      console.log(data);

      if (data.enrolled) {
        console.log("enrolled");
        navigate(`/course/${courseId}`);
      } else {
        console.log(courseId)
        const res = await fetch(`https://devkingsbackend-production-3753.up.railway.app/api/student/stripe/create-checkout-session/${courseId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        }
      }
    } catch (err) {
      console.error("Error checking enrollment:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Layout>
      <section className={styles.heroCourse}>
        <h1 className={styles.heroTitle}>{course.title}</h1>
        <div className={styles.heroCourseContainer}>
          <div className={styles.heroCourseInfo}>
            <div className={styles.heroShapeCourse}></div>
            <div className={styles.heroCourseCover}>
              <img className={styles.heroCourseCoverImg} src={`https://devkingsbackend-production-3753.up.railway.app/${course.thumbnail}`} alt="Thumbnail" />
              <div className={styles.heroCoverInfo}>
                <div className={styles.heroCoverInfoTeacher}>
                  <div className={styles.heroCatInfo}>
                    <div className={styles.studentsProfileCardHead}>
                      <img src={imgUser} alt="Teacher" />
                      <div>
                        <h1>{course.teacher.fullName}</h1>
                        <p><span>{course.teacher.profile}, </span><span>{course.category}</span></p>
                      </div>
                    </div>
                    <img src={lineHeroUp} alt="Line Up" />
                    <div className={styles.heroInfoPrice}>
                      <div className={styles.heroCatInfoPrice}>{course.price - (course.price * 10) / 100}</div>
                      <div className={styles.heroCat}>
                        <div className={styles.heroCatInfoPercentage}>10%</div>
                        <div className={styles.heroCatInfoPriceOld}>${course.price}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.heroCatInfoTeacher}>
                    <div className={styles.heroCatInfoCourse}>
                      <div>
                        <span className={styles.heroCatInfoKey}>Category:</span>
                        <span className={styles.heroCatInfoValue}>{course.category}</span>
                      </div>
                      <div>
                        <span className={styles.heroCatInfoKey}>Price:</span>
                        <span className={styles.heroCatInfoValue}>${course.price}</span>
                      </div>
                      <div>
                        <span className={styles.heroCatInfoKey}>Lessons:</span>
                        <span className={styles.heroCatInfoValue}>{course.lessons?.length}</span>
                      </div>
                      <div>
                        <span className={styles.heroCatInfoKey}>Resources:</span>
                        <span className={styles.heroCatInfoValue}>N/A</span>
                      </div>
                    </div>
                    <img src={lineHeroDown} alt="Line Down" />
                    <div className={styles.heroCatInfoAction}>
                      <div className={styles.heroCatInfoAdd}>
                        <a href=''>Add to Card</a>
                        {/* SVG icon */}
                      </div>
                      <a onClick={handleEnrollClick} className={styles.heroCatInfoEnroll}>Register to Enroll</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.heroTeacherInfo}>
            <div className={styles.studentProfileCard}>
              <div className={styles.studentsProfileCardBio}>
                <div className={styles.studentsProfileCardHead}>
                  <img src={imgUser} alt="Teacher" />
                  <div>
                    <h1>{course.teacher.fullName}</h1>
                    <p><span>{course.teacher.profile}, </span><span>{course.category}</span></p>
                  </div>
                </div>
                <div className={styles.studentsProfileCardBody}>{course.description}</div>
              </div>
              <img src={imgProfile} alt="Profile Line" />
              <div className={styles.studentsProfileCardPerformance}>
                <div className={styles.cardPerformance}>
                  <img src={imgCourse} alt="Courses" />
                  <div className={styles.count}>3455</div>
                  <div className={styles.title}>Courses</div>
                </div>
                <div className={styles.cardPerformance}>
                  <img src={imgPeople} alt="Students" />
                  <div className={styles.count}>{course.totalEnrolled}</div>
                  <div className={styles.title}>Students</div>
                </div>
                <div className={styles.cardPerformance}>
                  <img src={imgReview} alt="Reviews" />
                  <div className={styles.count}>{course.totalReviews}</div>
                  <div className={styles.title}>Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.descrpitionCourse}>
        <h1>Description:</h1>
        <div>{course.description}</div>
      </section>
      <section className={styles.benefitCourse}>
        <h1>Course Benefits:</h1>
        <div className={styles.benefitContainer}>
          {course.benefits?.map((benefit, index) => (
            <div key={index} className={styles.benefitCover}>
              <div className={styles.benefitKey}></div>
              <div className={styles.benefitValue}>{benefit}</div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.prerequisiteCourse}>
        <h1>Prerequisites</h1>
        <div className={styles.prerequisiteContainer}>
          {course.prerequisites?.map((prereq, index) => (
            <div key={index} className={styles.prerequisiteCover}>
              <div className={styles.prerequisiteKey}></div>
              <div className={styles.prerequisiteValue}>{prereq}</div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.reviewCourse}>
        <h1>Reviews & Ratings:</h1>
        <div className={styles.reviewProfileCards}>
          {course.reviews?.map((review, index) => (
            <div key={index} className={styles.reviewProfileCard}>
              <div className={styles.reviewProfileCardHead}>
                <img src={imgUser} alt="Reviewer" />
                <div className={styles.infoCardHead}>
                  <h3>{review.fullName}</h3>
                </div>
              </div>
              <div className={styles.reviewProfileCardBody}>
                {review.comment}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.faqCourse}>
        <h1>FAQ:</h1>
        <div className={styles.faqContainer}>
          {course.faqs?.map((faq, index) => (
            <div key={index} className={styles.faqLeft}>
              <div className={styles.faqLeftLeft}>
                <div className={styles.question}>{faq.question}</div>
                <svg width="215" height="4" viewBox="0 0 215 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="107.5" cy="2" rx="107.5" ry="2" fill="#F0F8FF" fillOpacity="0.5" />
                </svg>
                <div className={styles.answer}>{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default CourseEnroll;