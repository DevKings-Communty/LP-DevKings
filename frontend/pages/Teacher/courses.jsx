import { useEffect, useState,useContext } from 'react';
import '../Dashboard.css';
import TeacherSideBar from '../../components/TeacherSideBar/TeacherSideBar';
import logo from "../../public/logo.png";
import CourseCard from '../../components/Teacher-Courses/Course-card/CourseCard';
import { useNavigate, Link } from 'react-router-dom';
import './courses.css';
import { deleteCourse, fetchCourses } from './api';
import { AuthContext } from '../../context/AuthProvider';
export default function TeacherCourses() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);

  useEffect(() => {
  fetchCourses()
    .then(res => {
      setCourses(res.data);
      setLoading(false);
      setRefresh(false);
    })
    .catch(err => {
      console.error("Error fetching courses", err);
      setLoading(false);
      setRefresh(false);
    });
}, [refresh]);
  const handleDelete = id => {
    deleteCourse(id)
       .then(res=>{
        setRefresh(true)
        alert(res.data.message)
       })
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

   function EditShow(id) {
    navigate(`/teacher/course/${id}`)
  }

  return (
    <>
      <TeacherSideBar logo={logo} />
      <main className="courses-container">
        <header className="main-header">
          <h2>Your Courses</h2>
          <div className="header-actions">
              <span className="header-icon">⚙️</span>
              <div className="user-profile">
                {`${user.firstName} ${user.lastName}`}
                <img src={user && user.profilePic} style={{width:'70px', height:'70px', borderRadius:'50%'}} alt="" />
              </div>
          </div>
        </header>

        {
          courses.length > 0 ?<div className="courses-cards">
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search by course name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {loading ? (
            <div className="loading">Loading courses...</div>
          ) : (
            <div className="cards">
              {filteredCourses.length > 0 ? (
                filteredCourses.map(course => (
                  <CourseCard
                    image={course.image}
                    title={course.title}
                    category={course.category}
                    lessons={course.lessons}
                    students={course.students}
                    onEdit={() =>EditShow(course.id)}
                    onDelete={() => handleDelete(course.id)}
                    onShow={() => EditShow(course.id)}
                  />
                ))
              ) : (
                <p>No courses found.</p>
              )}
            </div>

          )}
        </div>:
        <div className="no-courses">
          <p>No courses </p>
          <img src="https://cdn-icons-png.flaticon.com/512/12444/12444803.png"/>
          <Link to='/teacher/addCourse' >
            <button>Add Your First Course</button>
          </Link>
        </div>
        }
      </main>
    </>
  );
}
