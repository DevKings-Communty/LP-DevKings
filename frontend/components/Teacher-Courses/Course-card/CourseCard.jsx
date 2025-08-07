import React from 'react';
import { FaPen, FaTrash, FaUsers, FaLayerGroup } from 'react-icons/fa';
import './CourseCard.css';

export default function CourseCard({
  image,
  title = "TitleCourse",
  category = "Design",
  lessons = 6,
  students = 2000,
  onEdit,
  onDelete,
  onShow
}) {
  return (
    <div className="course-card">
      <div className="course-img">
        <img src={`https://devkingsbackend-production-3753.up.railway.app/${image}`} alt="Course" />
      </div>
      <div className="course-info">
        <div className="course-header">
          <h2 className="course-title">{title}</h2>
          <div className="action-buttons">
            <button className='edit-card' onClick={onEdit} title="Edit">
              <FaPen/>
            </button>
            <button className='delete' onClick={onDelete} title="Delete">
              <FaTrash />
            </button>
          </div>
        </div>

        <div className="course-meta">
          <span className="category">{category}</span>
          <span className="lessons">
            <FaLayerGroup /> {lessons} Lessons
          </span>
        </div>

        <div className="card-footer">
          <span className="students">
            <FaUsers /> {students} Students
          </span>
          <button className="show-btn" onClick={onShow}>Show Course</button>
        </div>
      </div>
    </div>
  );
}
