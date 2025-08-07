import React from 'react'
import { Link } from 'react-router-dom'
// import logo from '/logo.png'
import { AuthContext } from '../../../context/AuthProvider'
import styles from './Header.module.css'
const Header = () => {
  const { user, logout, isAuthenticated } = React.useContext(AuthContext);
  return (
    <header>
      <nav>
        <Link to="/">
          <img src='/logo.png' className={styles.logo} alt="Vite logo" />
        </Link>
        <ul className={styles.navList}>
          <li><Link className={styles.linkNav} to="/">Home</Link></li>
          <li><Link className={styles.linkNav} to="">About us</Link></li>
          <li><Link className={styles.linkNav} to="">Teachers</Link></li>
          <li><Link className={styles.linkNav} to="/courses">Courses</Link></li>
          <li><Link className={styles.linkNav} to="/enrolled">Enrolled Courses</Link></li>
          <li><Link className={styles.linkNav} to="">For Student</Link></li>
        </ul>
        <div className={styles.auth}>
          {isAuthenticated ? (
            <div className={styles.logoutContainer}>
              <li><span>Hello</span>  <span className={styles.userName}>{user.firstName} {user.lastName}</span></li>
              <button className={styles.logout} onClick={logout}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/register" className={styles.register}>Register</Link>
              <Link to="/login" className={styles.login}>Login</Link>
            </>
          )}

        </div>
      </nav>
    </header>
  )
}

export default Header