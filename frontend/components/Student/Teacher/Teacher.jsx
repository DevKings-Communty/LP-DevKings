// import imgCourse from '../../course-img.svg'
import styles from './Teacher.module.css'

const Teacher = ({ teacher }) => {
    return (
        <div className={styles.teacherCard}>
            <div className={styles.teacherImg}>
                <img
                    //  src={`https://terrific-determination-production-cf17.up.railway.app/${teacher.profilePic}`}
                    src='course-img.svg'
                    alt="" />
            </div>
            <div className={styles.biography}>
                <div className={styles.teacherInfo}>
                    <h2 className={styles.teacherName}>{teacher.fullName}</h2>
                    <p>{teacher.bio}</p>
                    <h3>courses: <span>{teacher.coursesCount}</span></h3>
                </div>
                <div className={styles.teacherReview}>
                    <div className={styles.teacherReviewTotal}>({teacher.totalReviews})</div>
                    <div className={styles.teacherStar}>
                        <span>{teacher.avgReviews}</span>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.93423 1.87461C4.63089 0.624872 4.9792 0 5.49999 0C6.02079 0 6.3691 0.624867 7.06573 1.87461L7.24597 2.19793C7.44397 2.55307 7.54291 2.73064 7.6973 2.8478C7.85163 2.96496 8.0438 3.00845 8.42825 3.09543L8.77826 3.17462C10.131 3.48071 10.8075 3.63376 10.9684 4.15126C11.1293 4.66874 10.6682 5.20801 9.74593 6.28645L9.50734 6.56547C9.24527 6.87193 9.1142 7.02516 9.05524 7.21475C8.99634 7.40433 9.01614 7.60877 9.05574 8.01769L9.09182 8.38993C9.23124 9.82884 9.30098 10.5483 8.87968 10.8681C8.45833 11.188 7.82501 10.8963 6.55836 10.3132L6.23067 10.1623C5.87075 9.99654 5.69079 9.91365 5.49999 9.91365C5.3092 9.91365 5.12924 9.99654 4.76932 10.1623L4.44163 10.3132C3.17497 10.8963 2.54165 11.188 2.12033 10.8681C1.69902 10.5483 1.76873 9.82884 1.90817 8.38993L1.94424 8.01769C1.98386 7.60877 2.00368 7.40433 1.94472 7.21475C1.88577 7.02516 1.75474 6.87193 1.49266 6.56547L1.25405 6.28645C0.331788 5.20801 -0.129348 4.66874 0.031582 4.15126C0.192512 3.63376 0.868923 3.48071 2.22175 3.17462L2.57174 3.09543C2.95616 3.00845 3.14838 2.96496 3.30271 2.8478C3.45705 2.73064 3.55604 2.55307 3.754 2.19793L3.93423 1.87461Z" fill="url(#paint0_linear_44_62)" />
                            <defs>
                                <linearGradient id="paint0_linear_44_62" x1="5.49999" y1="3.74001" x2="2.41998" y2="11" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#F4FB94" />
                                    <stop offset="1" stopColor="#FFF700" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Teacher