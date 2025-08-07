import React from 'react';

export default function EditCourseCard({course,onEdit}) {
  const courseInfo = course.course;
  console.log(course)
  return (
    <div className="edit-course-card">
      <div className="edit-course-left">
        <div className="edit-course-image">
          <img
            src={`https://devkingsbackend-production-3753.up.railway.app/${courseInfo.thumbnail}`}
            alt="Course Cover"
          />
        </div>
        <div className="edit-course-info">
          <h2 className="edit-course-title">{courseInfo.title || 'huuhuhuhh'}</h2>
          <div className="edit-course-meta">
            <span className="edit-course-category">{courseInfo.category}</span>
            <span className="edit-course-lessons">{courseInfo.lessons.length}  lessons</span>
          </div>
          <p className="edit-course-students">{course.studentsCount} students enrolled</p>
        </div>
      </div>

      <div className="edit-course-right">
        <div className="edit-course-section">
          <h4 className="edit-course-section-title">What You’ll Learn</h4>
          <button className="edit" onClick={onEdit}>Edit</button>
          <ul className="edit-course-list">
            {courseInfo.benefits.map((b,i)=>{
              return <li key={i}>{b}</li>
            })}
          </ul>
        </div>

        <div className="edit-course-section">
          <h4 className="edit-course-section-title">Prerequisites</h4>
          <ul className="edit-course-list">
            {
              courseInfo.prerequisites.map((p,i)=>{
                return <li key={i}>{p}</li>
              })
            }
          </ul>
        </div>

        <div className="edit-course-section">
          <h4 className="edit-course-section-title">Resources</h4>
          <ul className="edit-course-list">
            {
              courseInfo.resources.map((r,i)=>{
                return <li key={i}>
                <a href={r.path} target="_blank" rel="noreferrer">
                  {r.title}
                </a>
                </li>
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
