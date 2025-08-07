import { useState } from 'react';

export default function CourseInfoModal({ course, onClose, onSave }) {
  const [form, setForm] = useState({
    title: course.title || '',
    description: course.description || '',
    category: course.category || '',
    price: course.price || '',
    benefits: (course.benefits || []).join('\n'),
    prerequisites: (course.prerequisites || []).join('\n'),
  });

  const [resources, setResources] = useState(course.resources || []);
  const [thumbnail, setThumbnail] = useState(null);
  const [imageSrc, setImageSrc] = useState(`https://devkingsbackend-production-3753.up.railway.app/${course.thumbnail}` || '');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

  };

  const handleThumbnailChange = e => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleResourceChange = (index, field, value) => {
    const updated = [...resources];
    updated[index][field] = value;
    setResources(updated);
  };

  const addResource = () => {
    setResources([...resources, { title: '', path: '' }]);
  };

  const removeResource = index => {
    const updated = resources.filter((_, i) => i !== index);
    setResources(updated);
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      benefits: form.benefits.split('\n').filter(Boolean),
      prerequisites: form.prerequisites.split('\n').filter(Boolean),
      resources: resources.filter(r => r.title && r.path), // filter incomplete ones
    };
    onSave(payload, thumbnail);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Course Info</h2>

        <div className="input-container" onClick={() => document.getElementById('thumbnail-input').click()}>
          <p>{!imageSrc && 'Click to upload thumbnail'}</p>
          <input id="thumbnail-input" type="file" onChange={handleThumbnailChange} style={{ display: 'none' }} />
          {imageSrc && <img src={imageSrc} alt="Thumbnail" className="thumbnail-preview" />}
        </div>

        {['title', 'description', 'category', 'price', 'benefits', 'prerequisites'].map(k => (
          <div key={k}>
            <label>{k}:</label>
            {['benefits', 'prerequisites'].includes(k) ? (
              <textarea name={k} value={form[k]} onChange={handleChange} rows="3" />
            ) : (
              <input type="text" name={k} value={form[k]} onChange={handleChange} />
            )}
          </div>
        ))}

        <div>
          <h4>Resources</h4>
          {resources.map((res, i) => (
            <div key={i} className="resource-entry">
              <input
                type="text"
                placeholder="Title"
                value={res.title}
                onChange={e => handleResourceChange(i, 'title', e.target.value)}
              />
              <input
                type="text"
                placeholder="URL"
                value={res.path}
                onChange={e => handleResourceChange(i, 'path', e.target.value)}
              />
              <button onClick={() => removeResource(i)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={addResource}>+ Add Resource</button>
        </div>

        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
