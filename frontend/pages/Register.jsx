import React, { useState } from 'react';
import logoAuth from '/logo-auth.svg';
import lineAuth from '/line-auth.svg';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message/Message';
import Layout from '../layouts/Student/Layout';
import styles from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState(null); // { message: '', type: '' }

  const showMessage = (message, type = 'info') => {
    setMsg({ message, type });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (!data.firstName || !data.lastName || !data.email || !data.role || !data.password || !data.confirmPassword) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    if (data.password !== data.confirmPassword) {
      showMessage('Passwords do not match', 'error');
      return;
    }

    try {
      const response = await fetch('https://devkingsbackend-production-3753.up.railway.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        showMessage(result.message || 'Registration failed', 'error');
      } else {
        showMessage('Registration successful!', 'success');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Something went wrong. Please try again.', 'error');
    }
  };

  return (
    <Layout>
      {msg && (
        <Message
          message={msg.message}
          type={msg.type}
          onClose={() => setMsg(null)}
        />
      )}
      <div className={styles.registerContent}>
        <div className={styles.registerForm}>
          <div className={styles.registerLogo}>
            <img src={logoAuth} alt="DevKings Logo" />
          </div>
          <form onSubmit={handleRegister}>
            <img src={lineAuth} alt="Line" />
            <div className={styles.switchAuth}>
              <Link to='/login' className={styles.signin}>Sign In</Link>
              <Link to='/register' className={styles.signup}>Sign Up</Link>
            </div>

            <div className={styles.labelInput}>
              <label>First Name:</label>
              <input type="text" name="firstName" required />
            </div>

            <div className={styles.labelInput}>
              <label>Last Name:</label>
              <input type="text" name="lastName" required />
            </div>

            <div className={styles.labelInput}>
              <label>Email:</label>
              <input type="email" name="email" required />
            </div>

            <div className={styles.labelInput}>
              <label>Role:</label>
              <select name="role" required>
                <option value="">Select Role</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className={styles.labelInput}>
              <label>Password:</label>
              <input type="password" name="password" required />
            </div>

            <div className={styles.labelInput}>
              <label>Confirm Password:</label>
              <input type="password" name="confirmPassword" required />
            </div>

            <div className={styles.formBtnAuth}>
              <div className={styles.policy}>
                Your personal data will be used to enhance your experience on this website, manage access to your account, and for other purposes outlined in our privacy policy.
              </div>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
        <div className='container'>
          <div className={styles.registerText}>
            <h1 className={styles.registerTitleOne}>Learning for Future</h1>
            <h1 className={styles.registerTitleTwo}>With <span>DevKings</span></h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
