import React, { useState, useEffect } from 'react';
import { fetchLesson } from '../../../pages/Teacher/api';
export default function LessonModal({ lessonId, onClose, onSave }) {
  const [lesson, setLesson] = useState(null);
  const [form, setForm] = useState({ title: '', description: '' });
  const [resources, setResources] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const [newVideoFile, setNewVideoFile] = useState(null);

  useEffect(() => {
    fetchLesson(lessonId).then(res => {
      const data = res.data;
      setLesson(data);
      setForm({ title: data.title, description: data.description });

      // Expecting resources as array of objects { title, path }
      const extractedResources = Array.isArray(data.resources)
        ? data.resources.map(r => ({
            title: r.title || '',
            path: r.path || '',
          }))
        : [];
      setResources(extractedResources);
      setVideoPreview(`https://devkingsbackend-production-3753.up.railway.app/${data.videoUrl}`);
    });
  }, [lessonId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleResourceChange = (index, field, value) => {
    const updated = [...resources];
    updated[index][field] = value;
    setResources(updated);
  };

  const addResourceField = () => {
    setResources([...resources, { title: '', path: '' }]);
  };

  const removeResourceField = (index) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      resources: JSON.stringify(resources),
    };

    if (newVideoFile) {
      payload.video_lesson = newVideoFile;
    }

    onSave(payload);
  };

  if (!lesson) return <div className="modal-backdrop"><div>Loading...</div></div>;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Lesson</h2>

        <label>Video:</label>
        {videoPreview && (
          <video width="100%" height="200" controls>
            <source src={videoPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <input type="file" accept="video/*" onChange={handleVideoChange} />

        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <label>Description:</label>
        <textarea
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
        />

        <label>Resources:</label>
        {resources.map((res, idx) => (
          <div key={idx} className="resource-pair">
            <button className='remove' type="button" onClick={() => removeResourceField(idx)}><i className="fa-solid fa-xmark"></i></button>
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
              style={{ width: '90%', marginBottom: '8px' }}
            />
          </div>
        ))}
        <button type="button" onClick={addResourceField}><i class="fas fa-plus"></i> Add Resource</button>

        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
