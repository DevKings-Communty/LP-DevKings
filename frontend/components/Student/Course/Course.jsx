import { Link } from 'react-router-dom';
import styles from './Course.module.css';

const Course = ({ course }) => {
  return (
    <div className={styles.card}>
      <img
        // src={`https://devkingsbackend-production-3753.up.railway.app/${course.thumbnail}`}
        src='course-img.svg'
        className={styles.cardImg}
        alt="Course Thumbnail"
      />
      <div className={styles.body}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <h4 className={styles.title}>
              {course.title}
            </h4>
            <div className={styles.price}>
              <p>{course.price}$</p>
              <span>{course.price + 100}$</span>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoTeacher}>
              <p className={styles.nameTeacher}>{course.teacherName}</p>
              <div className={styles.lineTeacher}></div>
              <div className={styles.categoryCourse}>{course.category}</div>
            </div>
            <p className={styles.descriptionCourse}>{course.description}</p>
            <div className={styles.lineLong}></div>
          </div>

          <div className={styles.footer}>
            <div className={styles.group}>
              <p className={styles.rate}>{course.averageRating || '4.5'}</p>
              <div className={styles.viewers}>({course.reviewCount || '120'} viewers)</div>
            </div>
            <div className={styles.footerLine}></div>
            <div className={styles.stars}>
              {[...Array(Math.floor(course.averageRating || 4)).keys()].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
          </div>

          <Link className={styles.link}>
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Course;
