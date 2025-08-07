import './SideBar.css';
import { Link, useLocation } from 'react-router-dom';

export default function SideBar({ logo }) {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <h1 className="logo"><img src={logo} alt="logo" /></h1>
      <nav className="sidebar-nav">
        <ul>
          <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname === "/admin/courses-crud" ? "active" : ""}>
            <Link to="/admin/courses-crud">Courses</Link>
          </li>
          <li className={location.pathname === "/admin/lessons-crud" ? "active" : ""}>
            <Link to="/admin/lessons-crud">Lessons</Link>
          </li>
          <li className={location.pathname === "/admin/users" ? "active" : ""}>
            <Link to="/admin/users">Users</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
