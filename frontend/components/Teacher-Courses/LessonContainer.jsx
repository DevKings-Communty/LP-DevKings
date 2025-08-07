import { useState } from "react";
import { addLesson } from "../../pages/Teacher/api"; // adjust this path if needed

export default function LessonsContainer({ lessons, onEdit, onDelete, courseId, onAdd }) {
  const [isAdding, setIsAdding] = useState(false);
  const [lesson, setLesson] = useState({
    title: '',
    description: '',
    video_lesson: null,
    resources: [{ title: '', path: '' }]
  });

  const handleAddLesson = () => {
    const payload = {
      ...lesson,
      resources: JSON.stringify(lesson.resources)
    };
    console.log(lesson)

    const formData = new FormData();
    formData.append('video_lesson', lesson.video_lesson);
    formData.append('title', lesson.title);
    formData.append('description', lesson.description);
    formData.append('resources', JSON.stringify(lesson.resources));

    addLesson(courseId, formData)
      .then(res => {
        onAdd(res.data);
        setLesson({
          title: '',
          description: '',
          video_lesson: null,
          resources: [{ title: '', path: '' }]
        });
        setIsAdding(false);
      })
      .catch(err => {
        console.error(err);
        alert(err?.response?.data?.message || "Failed to add lesson.");
      });
  };

  const handleResourceChange = (index, field, value) => {
    const newResources = [...lesson.resources];
    newResources[index][field] = value;
    setLesson(prev => ({ ...prev, resources: newResources }));
  };

  const addResourceField = () => {
    setLesson(prev => ({
      ...prev,
      resources: [...prev.resources, { title: '', path: '' }]
    }));
  };

  const removeResourceField = (index) => {
    setLesson(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="lessons-container-x">
      <h3 className="lessons-heading">Course Lessons</h3>

      {lessons.length > 0 ? lessons.map((lesson, index) => (
        <div key={index} className="lesson-card">
          <div className="lesson-info">
            <h4 className="lesson-title">{lesson.title}</h4>
            <p className="lesson-description">{lesson.description}</p>
          </div>
          <div className="lesson-actions">
            <button className="edit-btn" onClick={() => onEdit(lesson._id)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(lesson._id)}>Delete</button>
          </div>
        </div>
      )) : <p>No Lessons For this course</p>}

      {isAdding && (
        <div className="modal-backdrop">
          <div className="add-lesson-form modal">
          <h4>Add New Lesson</h4>
          <label >Title</label>
          <input
            type="text"
            placeholder="Lesson Title"
            value={lesson.title}
            onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
          />
          <label >Description</label>
          <textarea
            placeholder="Lesson Description"
            value={lesson.description}
            onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
          />
          <label >Upload Video Lesson</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setLesson({ ...lesson, video_lesson: e.target.files[0] })}
          />

          <label>Resources:</label>
          {lesson.resources.map((res, idx) => (
           <div key={idx} className="resource-pair">
            <button
              type="button"
              onClick={() => removeResourceField(idx)}
              className="remove"
              aria-label="Remove resource"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          <input
            type="text"
            placeholder="Resource Title"
            value={res.title}
            onChange={(e) => handleResourceChange(idx, 'title', e.target.value)}
            style={{ width: '90%', marginBottom: '8px' }}
          />
        <input
          type="text"
          placeholder="Resource URL"
          value={res.path}
          onChange={(e) => handleResourceChange(idx, 'path', e.target.value)}
          style={{ width: '90%' }}
        />
          </div>

          ))}
          <button className="add-Resource" type="button" onClick={addResourceField}><i class="fas fa-plus"></i> Add Resource</button>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleAddLesson}>Save</button>
            <button onClick={() => setIsAdding(false)}>Cancel</button>
          </div>
        </div>
        </div>
      )}

      {!isAdding && <button onClick={() => setIsAdding(true)} className="Add-lesson">Add Lesson</button>}
    </div>
  );
}
