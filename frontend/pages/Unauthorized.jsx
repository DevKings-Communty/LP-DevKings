import React from 'react';
import Header from '../components/Student/Header/Header';
import Footer from '../components/Student/Footer/Footer';
import './Unauthorized.css';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="unauthorized-root">
            <Header />
            <div className="unauthorized-content">
                <div className="unauthorized-icon">🔒</div>
                <h1 className="unauthorized-title">Access Denied</h1>
                <p className="unauthorized-message">
                    You do not have permission to access this page. Please log in with the appropriate credentials.
                </p>
                <div className="unauthorized-actions">
                    <Link to="/login" className="unauthorized-btn">Login</Link>
                    <Link to="/register" className="unauthorized-btn">Register</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Unauthorized;