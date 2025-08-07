import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Users.css'; // Reuse Users styling
import logo from "../public/logo.png";
import SideBar from '../components/sideBar/SideBar';
import Message from '../components/Message/Message';
const LessonsCrud = () => {
  // Mock data – fields inspired by Lesson backend model
  const [lessonsData, setLessonsData] = useState([]);
  const [msg, setMsg] = React.useState(null);
    
      const showMessage = (message, type = 'info') => {
        setMsg({ message, type });
      };
   useEffect(()=>{
      const fetchLessos = async ()=>{
        const response = await fetch('https://devkingsbackend-production-3753.up.railway.app/api/admin/lessons/all');
        const data = await response.json();
        if(!response.ok){
          alert(data.message);
        }else{
          setLessonsData(data);
        }
      }
      fetchLessos();
    },[])

  const handleDelete =async (lessonId) => {
    const response = await fetch(`https://terrific-determination-production-cf17.up.railway.app/api/admin/lessons/${lessonId}`,{
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
      setLessonsData(prev => prev.filter(l => l.id !== lessonId))
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
          <h2>Lessons Management</h2>
          <div className="header-actions">
           {/*  <button className="add-user-btn" onClick={handleAdd}>+ Add New Lesson</button> */}
          </div>
        </header>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Lesson ID</th>
                <th>Title</th>
                <th>Tutorial</th>
                <th>Description</th>
                <th>Video URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessonsData.map(lesson => (
                <tr key={lesson.id}>
                  <td>
                    <img src={`https://devkingsbackend-production-3753.up.railway.app/api/admin/courses/${lesson.thumbnail}`} alt={lesson.title} className="user-avatar" />
                  </td>
                  <td>{lesson.id}</td>
                  <td>{lesson.title}</td>
                  <td>{lesson.tutorial}</td>
                  <td>{lesson.description}</td>
                  <td><a href={lesson.videoUrl} target="_blank" rel="noreferrer">Video</a></td>
                  <td>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(lesson.id)}>Delete</button>
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

export default LessonsCrud;
