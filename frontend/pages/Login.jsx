import React from 'react'
import logoAuth from '/logo-auth.svg'
import lineAuth from '/line-auth.svg'
import Message from '../components/Message/Message'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import Layout from '../layouts/Student/Layout'
import styles from './Login.module.css'


const Login = () => {
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [msg, setMsg] = React.useState(null);

  const showMessage = (message, type = 'info') => {
    setMsg({ message, type });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    if (!data.email || !data.password) {
      showMessage('Please fill in all fields', 'error');
      return;
    }
    try {
      const response = await fetch('https://devkingsbackend-production-3753.up.railway.app/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'    // ✅ THIS is the correct place
    });

      const result = await response.json();
      if (!response.ok) {
        showMessage(result.message, 'error');
      } else {
        login(result)
        if(result.user.role === 'teacher'){
          navigate('/teacher/dashboard')
        }else{
          navigate('/')
        }
      }
    } catch (err) {
      showMessage("Sorry Something Went Wrong", 'error');
    }
  }
  return (
    <Layout>
      {msg && (
        <Message
          message={msg.message}
          type={msg.type}
          onClose={() => setMsg(null)}
        />
      )}
      <div className={styles.loginContent}>
        <div className={styles.loginForm}>
          <div className={styles.loginLogo}>
            <img src={logoAuth} alt="" />
          </div>
          <form onSubmit={handleLogin}>
            <img src={lineAuth} alt="" />
            <div className={styles.switchAuth}>
              <Link to='/login' className={styles.signin}>Sign In</Link>
              <Link to='/register' className={styles.signup}>Sign Up</Link>
            </div>
            <div className={styles.labelInput}>
              <label htmlFor="">Email:</label>
              <input type="email" name='email' />
            </div>
            <div className={styles.labelInput}>
              <label htmlFor="">Password:</label>
              <input type="password" name='password' />
            </div>
            <div className={styles.formBtnAuth}>
              <div className={styles.labelCheckbox}>
                <input type='checkbox' />
                <div>Keep me logged in</div>
              </div>
              <button>Login</button>
            </div>
          </form>
          <div className={styles.formForgot}>
            <Link className={styles.forgot} to='/'>Forgot your password?</Link>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.loginText}>
            <h1 className={styles.loginTitleOne}>Learning for Future</h1>
            <h1 className={styles.loginTitleTwo}>With <span>DevKings</span></h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login