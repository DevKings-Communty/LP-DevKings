import React from 'react'
import Header from '../../components/Student/Header/Header'
import Footer from '../../components/Student/Footer/Footer'
import imgUser from '/user-teacher.svg'
import linePerformance from '/line-performance.svg'
import imgCourse from '/icon_courses.svg'
import imgReview from '/customer-reviews.svg'
import imgProfile from '/line-profile.svg'
import imgCard from '/img-card.svg'
import './TeacherProfile.css'

const TeacherProfile = () => {
    return (
        <>
            <Header />
            <main>
                <section className='teacher-profile'>
                    <div className='teacher-info'>
                        <div className='teacher-shape'></div>
                        <div className='teacher-bio'>
                            <div className='teacher-bio-head'>
                                <img src={imgUser} alt="" />
                                <div>
                                    <h1>Name teacher</h1>
                                    <p><span>Name Category,</span><span>Name Category</span></p>
                                </div>
                            </div>
                            <div className='teacher-bio-body'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</div>
                        </div>
                    </div>
                    <div className='teacher-performance'>
                        <div className='teacher-performance-right'>
                            <div className='performance-right'>
                                <img src={imgCourse} alt="" />
                                <div className='title'>All Courses</div>
                                <img src={linePerformance} alt="" />
                                <div className='count'>122</div>
                            </div>
                            <div className='performance-right'>
                                <img src={imgCourse} alt="" />
                                <div className='title'>All Students</div>
                                <img src={linePerformance} alt="" />
                                <div className='count'>3455</div>
                            </div>
                        </div>
                        <div className='teacher-performance-left'></div>
                    </div>
                </section>
                <section className='teacher-profile-students'>
                    <h1>The students you follow:</h1>
                    <div>
                        <div className="students-profile-cards">
                            <div className="student-profile-card">
                                <div className='students-profile-card-bio'>
                                    <div className='students-profile-card-head'>
                                        <img src={imgUser} alt="" />
                                        <div>
                                            <h1>Name</h1>
                                            <p><span>email@gmail.com</span></p>
                                        </div>
                                    </div>
                                    <div className='students-profile-card-body'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</div>
                                </div>
                                <img src={imgProfile} alt="" />
                                <div className='students-profile-card-performance'>
                                    <div className="card-performance">
                                        <img src={imgCourse} alt="" />
                                        <div className='count'>3455</div>
                                        <div className='title'>Courses Completed</div>
                                    </div>
                                    <div className="card-performance">
                                        <img src={imgCourse} alt="" />
                                        <div className='count'>3455</div>
                                        <div className='title'>Courses In Progress</div>
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
                <section className='teacher-profile-courses'>
                    <h1>Top Courses:</h1>
                    <div className="courses-profile-cards">
                        <div className="course-profile-card">
                            <div className="head-card">
                                <img src={imgCard} alt="" />
                            </div>
                            <div className="body-card">
                                <h1>Title Course</h1>
                                <div className="body-card-container">
                                    <div className='body-card-head'>
                                        <div className="content-card-head">
                                            <div className='body-card-head-cat'>Design</div>
                                            <div className='body-card-head-line'></div>
                                            <div className='body-card-head-name'>6 lessons</div>
                                        </div>
                                        <div className='content-card-body'>
                                            <div className='body-card-level'>Begginer A1</div>
                                            <div className='body-card-count'>2000 Students</div>
                                        </div>
                                    </div>
                                    <div className='body-card-body'>
                                        <div className="icons-card">
                                            <svg className='icon-card-add' width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="40" height="38" rx="7" fill="#F0F8FF" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2693 8.14286C17.2693 7.51168 17.7766 7 18.4024 7C19.0282 7 19.5355 7.51168 19.5355 8.14286V15.6695L22.1337 13.049C22.5762 12.6027 23.2937 12.6027 23.7362 13.049C24.1787 13.4953 24.1787 14.2189 23.7362 14.6653L19.2037 19.2367C18.7612 19.683 18.0437 19.683 17.6012 19.2367L13.0687 14.6653C12.6262 14.2189 12.6262 13.4953 13.0687 13.049C13.5111 12.6027 14.2286 12.6027 14.6711 13.049L17.2693 15.6695V8.14286ZM32 9.28571C32 8.65454 31.4927 8.14286 30.8669 8.14286H30.3316C28.7986 8.14286 27.4553 9.17768 27.052 10.6693L26.5803 12.4136L24.3357 20.7143H12.4693L10.2266 12.4138C10.0621 11.8048 9.43923 11.4457 8.8355 11.6116C8.23165 11.7776 7.87562 12.4058 8.04015 13.0148L10.2827 21.3152C10.5515 22.3099 11.4471 23 12.4693 23H24.0681V24.1429C24.0681 24.7741 23.5608 25.2857 22.9349 25.2857H14.4365H12.7368C12.1109 25.2857 11.6036 25.7974 11.6036 26.4286C11.6036 26.6709 11.6784 26.8955 11.8059 27.0805C11.6755 27.4089 11.6036 27.7674 11.6036 28.1429C11.6036 29.7208 12.8719 31 14.4365 31C16.001 31 17.2693 29.7208 17.2693 28.1429C17.2693 27.9472 17.2498 27.7561 17.2126 27.5714H20.7253C20.6882 27.7561 20.6687 27.9472 20.6687 28.1429C20.6687 29.7208 21.937 31 23.5015 31C25.066 31 26.3343 29.7208 26.3343 28.1429C26.3343 27.4149 26.0644 26.7504 25.6199 26.2459C26.0677 25.6653 26.3343 24.9354 26.3343 24.1429V22.0102L28.7667 13.015L29.2384 11.2707C29.3728 10.7735 29.8206 10.4286 30.3316 10.4286H30.8669C31.4927 10.4286 32 9.91689 32 9.28571ZM15.003 28.1429C15.003 27.8273 14.7493 27.5714 14.4365 27.5714C14.1236 27.5714 13.8699 27.8273 13.8699 28.1429C13.8699 28.4584 14.1236 28.7143 14.4365 28.7143C14.7493 28.7143 15.003 28.4584 15.003 28.1429ZM24.0681 28.1429C24.0681 27.8273 23.8144 27.5714 23.5015 27.5714C23.1886 27.5714 22.9349 27.8273 22.9349 28.1429C22.9349 28.4584 23.1886 28.7143 23.5015 28.7143C23.8144 28.7143 24.0681 28.4584 24.0681 28.1429Z" fill="#0C0C0C" />
                                            </svg>
                                            <svg className='icon-card-heart' width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="39" height="37" rx="6.5" fill="#F0F8FF" />
                                                <rect x="0.5" y="0.5" width="39" height="37" rx="6.5" stroke="#6A6A6A" />
                                                <path d="M20 12.1699L19.4219 12.7257C19.5732 12.8827 19.7819 12.9714 20 12.9714C20.2181 12.9714 20.4268 12.8827 20.5781 12.7257L20 12.1699ZM14.6518 23.8395C14.3097 23.5583 13.804 23.6073 13.5225 23.9491C13.2409 24.2908 13.29 24.7959 13.6321 25.0772L14.6518 23.8395ZM9.66818 20.6236C9.88079 21.012 10.3683 21.1546 10.7571 20.9422C11.1459 20.7297 11.2886 20.2428 11.076 19.8544L9.66818 20.6236ZM10.1047 16.0559C10.1047 13.7575 11.4048 11.83 13.1795 11.0196C14.9037 10.2323 17.2204 10.4408 19.4219 12.7257L20.5781 11.6141C17.9658 8.90302 14.9337 8.4562 12.5124 9.56176C10.1418 10.6442 8.5 13.1577 8.5 16.0559H10.1047ZM16.2531 27.1298C16.801 27.5613 17.3893 28.0215 17.9854 28.3694C18.5814 28.7172 19.2614 29 20 29V27.3971C19.6688 27.3971 19.2791 27.2681 18.795 26.9854C18.3112 26.703 17.8092 26.3141 17.2465 25.871L16.2531 27.1298ZM23.747 27.1298C25.2731 25.9279 27.2239 24.5509 28.7542 22.8296C30.312 21.0774 31.5 18.9043 31.5 16.0559H29.8953C29.8953 18.4041 28.9334 20.214 27.5544 21.7652C26.1478 23.3473 24.3749 24.5942 22.7536 25.871L23.747 27.1298ZM31.5 16.0559C31.5 13.1577 29.8582 10.6442 27.4875 9.56176C25.0663 8.4562 22.0342 8.90302 19.4219 11.6141L20.5781 12.7257C22.7796 10.4408 25.0963 10.2323 26.8204 11.0196C28.5952 11.83 29.8953 13.7575 29.8953 16.0559H31.5ZM22.7536 25.871C22.1908 26.3141 21.6888 26.703 21.205 26.9854C20.7209 27.2681 20.3312 27.3971 20 27.3971V29C20.7386 29 21.4186 28.7172 22.0146 28.3694C22.6108 28.0215 23.1989 27.5613 23.747 27.1298L22.7536 25.871ZM17.2465 25.871C16.395 25.2005 15.5298 24.5613 14.6518 23.8395L13.6321 25.0772C14.5203 25.8074 15.4585 26.5041 16.2531 27.1298L17.2465 25.871ZM11.076 19.8544C10.4756 18.7579 10.1047 17.5159 10.1047 16.0559H8.5C8.5 17.8058 8.94925 19.3105 9.66818 20.6236L11.076 19.8544Z" fill="#6A6A6A" />
                                            </svg>
                                        </div>
                                        <a href="">
                                            Register to Enroll
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='teacher-profile-reviews'>
                    <h1>Top Review:</h1>
                    <div className="review-profile-cards">
                        <div className="review-profile-card">
                            <div className="review-profile-card-head">
                                <img src={imgUser} alt="" />
                                <div className="info-card-head">
                                    <h3>Name Student</h3>
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.64955 2.21545C5.47286 0.738486 5.88451 0 6.49999 0C7.11548 0 7.52712 0.738479 8.35041 2.21544L8.56342 2.59755C8.79741 3.01726 8.91435 3.22712 9.0968 3.36558C9.27919 3.50404 9.5063 3.55544 9.96065 3.65824L10.3743 3.75182C11.9731 4.11357 12.7725 4.29444 12.9627 4.90603C13.1529 5.5176 12.6079 6.15492 11.5179 7.42945L11.236 7.75919C10.9262 8.12137 10.7713 8.30246 10.7017 8.52652C10.632 8.75057 10.6554 8.99218 10.7022 9.47545L10.7449 9.91537C10.9097 11.6159 10.9921 12.4662 10.4942 12.8441C9.99621 13.2221 9.24774 12.8775 7.75079 12.1883L7.36352 12.0099C6.93816 11.8141 6.72548 11.7161 6.49999 11.7161C6.27451 11.7161 6.06183 11.8141 5.63647 12.0099L5.2492 12.1883C3.75224 12.8775 3.00376 13.2221 2.50585 12.8441C2.00793 12.4662 2.09032 11.6159 2.25511 9.91537L2.29774 9.47545C2.34457 8.99218 2.36798 8.75057 2.29831 8.52652C2.22864 8.30246 2.07378 8.12137 1.76405 7.75919L1.48206 7.42945C0.392113 6.15492 -0.152866 5.5176 0.0373242 4.90603C0.227514 4.29444 1.02691 4.11357 2.6257 3.75182L3.03933 3.65824C3.49365 3.55544 3.72081 3.50404 3.90321 3.36558C4.0856 3.22712 4.20259 3.01727 4.43655 2.59755L4.64955 2.21545Z" fill="url(#paint0_linear_558_649)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_558_649" x1="6.49999" y1="4.42001" x2="2.85998" y2="13" gradientUnits="userSpaceOnUse">
                                                <stop offset="0.403846" stop-color="#F4FB94" />
                                                <stop offset="1" stop-color="#F2FF00" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="review-profile-card-body">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default TeacherProfile