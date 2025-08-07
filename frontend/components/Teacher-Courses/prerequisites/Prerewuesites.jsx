import './prerequisites.css';

const PrereQuisites = ({ prerequisites, setPrerequisites,updateFullCourseData }) => {
  const addBenefit = () => setPrerequisites([...prerequisites, ""]);

  const updateBenefit = (index, value) => {
    const newprerequisites = [...prerequisites];
    newprerequisites[index] = value;
    updateFullCourseData(prev=>({...prev,prerequisites:newprerequisites}))
    setPrerequisites(newprerequisites);
  };

  const removeBenefit = (index) => {
    const newprerequisites = prerequisites.filter((_, i) => i !== index);
    updateFullCourseData(prev=>({...prev,prerequisites:newprerequisites}))
    setPrerequisites(newprerequisites);
  };

  return (
    <div className='benefits-container'>
      <h3>Prerequisites:</h3>
      <div className="benefits">
        {prerequisites.map((b, index) => (
          <div className="benefit" key={index}>
            <div className="input-group">
              <label htmlFor={`prerequist${index}`}>{`Prerequist ${index + 1}`}</label>
              <input
                type="text"
                id={`prerequist${index}`}
                value={b}
                onChange={(e) => updateBenefit(index, e.target.value)}
                placeholder="Enter benefit..."
              />
            </div>
            <button
              type="button"
              onClick={() => removeBenefit(index)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))}

        <button type="button" className='addBenefit' onClick={addBenefit}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default PrereQuisites;
