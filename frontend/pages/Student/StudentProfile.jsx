import React from 'react'
import Header from '../../components/Student/Header/Header'
import Footer from '../../components/Student/Footer/Footer'
import imgUser from '/user-teacher.svg'
import linePerformance from '/line-performance.svg'
import imgCourse from '/icon_courses.svg'
import imgPeople from '/people.svg'
import imgReview from '/customer-reviews.svg'
import imgProfile from '/line-profile.svg'
import imgCard from '/img-card.svg'
import './StudentProfile.css'

const StudentProfile = () => {
    return (
        <>
            <Header />
            <main>
                <section className='student-profile'>
                    <div className='student-info'>
                        <div className='student-shape'></div>
                        <div className='student-bio'>
                            <div className='student-bio-head'>
                                <img src={imgUser} alt="" />
                                <div>
                                    <h1>Name teacher</h1>
                                    <p><span>Name Category,</span><span>Name Category</span></p>
                                </div>
                            </div>
                            <div className='student-bio-body'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</div>
                        </div>
                    </div>
                    <div className='student-performance'>
                        <div className='student-performance-right'>
                            <div className='performance-right'>
                                <img src={imgCourse} alt="" />
                                <div className='title'>Courses
                                    Started</div>
                                <img src={linePerformance} alt="" />
                                <div className='count count-red'>122</div>
                            </div>
                            <div className='performance-right'>
                                <img src={imgCourse} alt="" />
                                <div className='title'>Courses
                                    Completed</div>
                                <img src={linePerformance} alt="" />
                                <div className='count'>3455</div>
                            </div>
                        </div>
                        <div className='student-performance-left'></div>
                    </div>
                </section>
                <section className='student-profile-students'>
                    <h1>The teachers you follow:</h1>
                    <div>
                        <div className="students-profile-cards">
                            <div className="student-profile-card">
                                <div className='students-profile-card-bio'>
                                    <div className='students-profile-card-head'>
                                        <img src={imgUser} alt="" />
                                        <div>
                                            <h1>Name</h1>
                                            <p><span>Publisher, </span><span>Category</span></p>
                                        </div>
                                    </div>
                                    <div className='students-profile-card-body'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</div>
                                </div>
                                <img src={imgProfile} alt="" />
                                <div className='students-profile-card-performance'>
                                    <div className="card-performance">
                                        <img src={imgCourse} alt="" />
                                        <div className='count'>3455</div>
                                        <div className='title'>Courses</div>
                                    </div>
                                    <div className="card-performance">
                                        <img src={imgPeople} alt="" />
                                        <div className='count'>3455</div>
                                        <div className='title'>Students</div>
                                    </div>
                                    <div className="card-performance">
                                        <img src={imgReview} alt="" />
                                        <div className='count'>3455</div>
                                        <div className='title'>Reviews</div>
                                    </div>
                                </div>
                                {/* <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="-0.5" width="34" height="34" rx="17" transform="matrix(1 0 0 -1 0 34)" fill="#F0F8FF" />
                                    <rect x="0.5" y="-0.5" width="34" height="34" rx="17" transform="matrix(1 0 0 -1 0 34)" stroke="black" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4997 30.625C18.3051 30.625 18.958 29.9721 18.958 29.1667V9.35404L26.6768 17.0729C27.2463 17.6423 28.1697 17.6423 28.7392 17.0729C29.3087 16.5034 29.3087 15.58 28.7392 15.0105L18.5309 4.80214C17.9614 4.23266 17.038 4.23266 16.4685 4.80214L6.26014 15.0105C5.69063 15.58 5.69063 16.5034 6.26014 17.0729C6.82966 17.6423 7.75302 17.6423 8.32254 17.0729L16.0413 9.35404V29.1667C16.0413 29.9721 16.6942 30.625 17.4997 30.625Z" fill="#0C0C0C" />
                                </svg> */}
                            </div>
                        </div>
                    </div>
                </section>
                <section className='student-profile-courses'>
                    <h1>My Courses:</h1>
                    <div className="courses-profile-cards">
                        <div className="course-profile-card">
                            <div className="head-card">
                                <img src={imgCard} alt="" />
                            </div>
                            <div className="body-card">
                                <h1>Title Course</h1>
                                <div className='content-card-head'>
                                    <div className='body-card-head-cat'>Design</div>
                                    <div className='body-card-head-line'></div>
                                    <div className='body-card-head-name'>NameTeacher</div>
                                </div>
                                <div className='body-card-body'>
                                    <div className='body-card-body-performance'>
                                        <div className='body-card-level'>Begginer A1</div>
                                        <div className='body-card-progress'>0%</div>
                                    </div>
                                    <div className='body-card-body-progress'>
                                        <progress id="file" value="22" max="100"> 32% </progress>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default StudentProfile