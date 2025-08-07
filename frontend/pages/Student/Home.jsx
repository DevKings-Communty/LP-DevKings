import React, { useRef } from 'react'
import Hero from '../../components/Student/Hero/Hero'
import About from '../../components/Student/About/About'
import Teacher from '../../components/Student/Teacher/Teacher'
import Layout from '../../layouts/Student/Layout'
import Course from '../../components/Student/Course/Course'
import Student from '../../components/Student/Student/Student'
import Contact from '../../components/Student/Contact/Contact'
import studentBenefitsData from '../studentsBenefits'
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css'

const ITEM_WIDTH = 300;

const Home = () => {
    const navigate = useNavigate();
    const [TopCourses, setTopCourses] = React.useState([]);
    const [TopTeachers, setTopTeachers] = React.useState([])
    const [scrollTeacher, setScrollTeacher] = React.useState(0)
    const [studentBenefits, setStudentBenefits] = React.useState(studentBenefitsData);

    React.useEffect(() => {
        async function getTopCourses() {
            try {
                const response = await fetch('https://devkingsbackend-production-3753.up.railway.app/api/public/home');
                const responseData = await response.json();
                console.log(responseData);
                setTopCourses(responseData.topCourses)
                setTopTeachers(responseData.topTeachers)
            } catch (err) {
                console.log("Error Fetchiing the Data: ", err);
            }
        }
        getTopCourses();
    }, [])
    const coursesElements = TopCourses.map(course => {
        return <Course key={course._id} course={course} id={course._id} />
    })
    const teachersElements = TopTeachers.map((teacher, index) => {
        return <Teacher key={index} teacher={teacher} />
    })
    const studentsBenefitsElmenets = studentBenefits.map((benefit, index) => {
        return <Student key={index} benefit={benefit} />
    })

    const containerTeacherRef = useRef();

    const handleScroll = (scrollAmount) => {
        const newScrollPosition = scrollTeacher + scrollAmount;
        setScrollTeacher(newScrollPosition)
        containerTeacherRef.current.scrollLeft = newScrollPosition
    }

    // function handleClick(category) {
    //     navigate(`/courses?category=${category}`)
    // }
    function viewAll() {
        navigate('/courses');
    }
    return (
        <Layout>
            <Hero />
            <About />
            <section className={styles.sectionTeachers}>
                <h1>Top Teachers:</h1>
                <div className={styles.teacherContainer}>
                    <button onClick={() => { handleScroll(ITEM_WIDTH) }}>
                        <svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.1864 1.41528C25.2711 2.63569 25.2711 4.61432 24.1864 5.83473L9.48392 22.375H47.2222C48.7564 22.375 50 23.7741 50 25.5C50 27.226 48.7564 28.625 47.2222 28.625H9.48392L24.1864 45.1654C25.2711 46.3857 25.2711 48.3644 24.1864 49.5848C23.1017 50.8051 21.3428 50.8051 20.2581 49.5848L0.813583 27.7097C0.292667 27.1238 0 26.3288 0 25.5C0 24.6713 0.292667 23.8763 0.813583 23.2903L20.2581 1.41528C21.3428 0.194906 23.1017 0.194906 24.1864 1.41528Z" fill="#0C0C0C" />
                        </svg>
                    </button>
                    <div ref={containerTeacherRef} className={styles.teachersCards}>
                        {teachersElements}
                    </div>
                </div>
            </section>
            <section className={styles.sectionCourses}>
                <h1>Top Courses:</h1>
                {/* <section className={styles.categoryContainer}>
                    <button onClick={() => { handleClick("design") }}>Design</button>
                    <button onClick={() => { handleClick("JavaScript") }}>JavaScript</button>
                    <button onClick={() => { handleClick("Ai") }}>Ai and Ml</button>
                    <button onClick={() => { handleClick("python") }}>python</button>
                    <button onClick={() => { handleClick("Data") }}>Data</button>
                </section> */}
                <div className={styles.courseContainer}>
                    {coursesElements}
                </div>
                <div className={styles.containerCourseButton}>
                    <button
                        onClick={viewAll}
                        className={styles.viewAll}>
                        Visite Courses
                    </button>
                </div>
            </section>
            <section className={styles.sectionStudents}>
                <h1>For Students:</h1>
                <p className={styles.subTitle}>Why learn with Devkings?</p>
                <div className={styles.cards}>
                    {studentsBenefitsElmenets}
                </div>
            </section>
            <Contact />
        </Layout>
    )
}

export default Home;