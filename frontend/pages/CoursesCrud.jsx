import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Users.css'; // Reuse Users page styling
import logo from "../public/logo.png";
import SideBar from '../components/sideBar/SideBar'
import Message from '../components/Message/Message';
const CoursesCrud = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [msg, setMsg] = React.useState(null);
  
    const showMessage = (message, type = 'info') => {
      setMsg({ message, type });
    };
  useEffect(()=>{
    const fetchCourses = async ()=>{
      const response = await fetch('https://devkingsbackend-production-3753.up.railway.app/api/admin/courses/all');
      const data = await response.json();
      if(!response.ok){
        alert(data.message);
      }else{
        setCoursesData(data);
      }
    }
    fetchCourses();
  },[])

  const handleDelete =async (courseId) => {
    setCoursesData(prev => prev.filter(c => c.id !== courseId));
    const response = await fetch(`https://devkingsbackend-production-3753.up.railway.app/api/admin/courses/${courseId}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'Application/json'
      },
      body:JSON.stringify({})
    });
    const data = await response.json();
    if(!response.ok){
      showMessage(data.message, 'error')
    }else{
      setCoursesData(prev => prev.filter(c => c.id !== courseId))
      showMessage(data.message, 'success')
    }
  };

  return (
    <div className="users-container">
      {msg && <Message message={msg.message} type={msg.type}/>}
      {/* Sidebar */}
      <SideBar logo={logo}/>
      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h2>Courses Management</h2>
          <div className="header-actions">
            {/* <button className="add-user-btn" onClick={handleAdd}>+ Add New Course</button> */}
          </div>
        </header>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Course ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Instructor</th>
                <th>Price ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coursesData.map(course => (
                <tr key={course.id}>
                  <td>
                    <img src={`https://devkingsbackend-production-3753.up.railway.app/api/admin/courses/${course.thumbnail}`} alt={course.title} className="user-avatar" />
                  </td>
                  <td>{course.id}</td>
                  <td>{course.title}</td>
                  <td>{course.category}</td>
                  <td>{course.instructor}</td>
                  <td>{course.price.toFixed(2)}</td>
                  <td>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(course.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default CoursesCrud;
