import React, { useState } from "react";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider'

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    fetch('https://devkingsbackend-production-3753.up.railway.app/api/admin/login',{
        method:'POST',
        headers:{
            'Content-Type':'Application/json'
        },
        body:JSON.stringify({
            email:formData.email,
            password:formData.password
        })
    })
      .then(res=>res.json())
      .then(data=>{
        login(data)
        navigate('/admin/dashboard')
      })
      .catch(err=>{
        console.log(err);
      })
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2 className="admin-title">Admin Login</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="admin@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
