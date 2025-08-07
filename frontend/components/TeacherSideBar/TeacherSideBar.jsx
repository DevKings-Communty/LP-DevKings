import '../sideBar/SideBar.css';
import { Link, useLocation } from 'react-router-dom';

export default function TeacherSideBar({ logo }) {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <h1 className="logo"><img src={logo} alt="logo" /></h1>
      <nav className="sidebar-nav">
        <ul>
          <li className={location.pathname === "/teacher/dashboard" ? "active" : ""}>
            <Link to="/teacher/dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname === "/teacher/courses" ? "active" : ""}>
            <Link to="/teacher/courses">Courses</Link>
          </li>
          <li className={location.pathname === "/teacher/AddCourse" ? "active" : ""}>
            <Link to="/teacher/AddCourse">Add Course</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
