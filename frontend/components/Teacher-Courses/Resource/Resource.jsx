import '../Benefits/benefits.css';

const ResourceList = ({ resources, setResources, updateFullCourseData, disabled }) => {
  const addResource = () =>
    setResources([...resources, { title: '', path: '', isSaved: false }]);

  const updateResource = (index, name, value) => {
    const newResources = [...resources];
    newResources[index][name] = value;
    updateFullCourseData && updateFullCourseData((prev) => ({ ...prev, resources: newResources }));
    setResources(newResources);
  };

  const removeResource = (index) => {
    const newResources = resources.filter((_, i) => i !== index);
    setResources(newResources);
  };

  return (
    <div className="benefits-container">
      <h3>Resources:</h3>
      <div className="benefits">
        {resources.map((r, index) => (
          <div className="benefit" key={index}>
            <div className="input-group">
              <label htmlFor={`resource${index}name`}>{`Resource ${index + 1} Name`}</label>
              <input
                type="text"
                name="title"
                id={`resource${index}name`}
                value={r.title}
                onChange={(e) => updateResource(index, e.target.name, e.target.value)}
                placeholder="Enter resource name..."
                disabled={disabled}
              />
            </div>
            <div className="input-group">
              <label htmlFor={`resource${index}url`}>{`Resource ${index + 1} URL`}</label>
              <input
                type="text"
                name="path"
                id={`resource${index}url`}
                value={r.path}
                onChange={(e) => updateResource(index, e.target.name, e.target.value)}
                placeholder="Enter resource URL..."
                disabled={disabled}
              />
            </div>
            {!disabled && (
              <button type="button" onClick={() => removeResource(index)}>
                <i className="fas fa-trash"></i>
              </button>
            )}
          </div>
        ))}

        {!disabled && (
          <button type="button" className="addBenefit" onClick={addResource}>
            <i className="fas fa-plus"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default ResourceList;
