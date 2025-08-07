import { useState, useEffect } from "react";
import BenefitsList from "../Benefits/Benefits";
import PrereQuisites from "../prerequisites/Prerewuesites";
import ResourceList from "../Resource/Resource";
import './CourseInfo.css';
const CourseInfoForm = ({ onChange, onsubmit }) => {
  const [benefits, setBenefits] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [resources, setResources] = useState([]);
  const [fullCourseData, setFullCourseData] = useState({
    metaData:null,
    benefits:null,
    resources:null,
    prerequisites:null
  })
  const [data, setData] = useState({
    thumbnail: null,
    title: '',
    category: '',
    price: '00',
    description: ''
  });
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newData = {
      ...data,
      [name]: files ? files[0] : value
    };
    
    setData(newData);
    setFullCourseData(prev=>({...prev,metaData:newData}))
    onChange(prevData=>({...prevData,metaData:newData}))
  };
  function handleSave(){
    const finalCourseData = {
      metaData:data,
      benefits,
      resources,
      prerequisites
    }
    onsubmit(finalCourseData)
  }
  useEffect(() => {
    const isValid =
      data.title.length > 6 &&
      data.category !== '' &&
      data.description.length > 6 &&
      data.thumbnail &&
      !isNaN(Number(data.price)); 

    setBtnDisabled(!isValid);
  }, [data]);

  function addBenefits(){
    setBenefits(['']);
  }
  function addPrerequisite(){
    setPrerequisites([''])
  }
  function addResource() {
    setResources([{title:'',path:''}])
  }
  return (
    <div className="add-courseForm-cpntainer">
      <h2>Course Info</h2>
      <div className="upload-container">
        <span>Upload Course Thumbnail</span>
        <div className="input-container" onClick={() => document.getElementById('thumbnail-input').click()}>
          <p>{!data.thumbnail &&'Click here to upload'}</p>
          <input
            id="thumbnail-input"
            type="file"
            name="thumbnail"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          {data.thumbnail && (
    <img
      src={URL.createObjectURL(data.thumbnail)}
      alt="Thumbnail Preview"
      className="thumbnail-preview"
    />
  )}
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" value={data.title} onChange={handleChange} placeholder="Course Name" />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select name="category" id="category" value={data.category} onChange={handleChange}>
            <option value="" disabled>Select Category</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="data">Data</option>
            <option value="ai">AI</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="price">Price ($)</label>
          <input id="price" name="price" value={data.price} onChange={handleChange} placeholder="Price" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={data.description} onChange={handleChange} placeholder="Description" />
        </div>
      </div>
      {benefits.length > 0 && <BenefitsList benefits={benefits} setBenefits={setBenefits} updateFullCourseData={setFullCourseData}/>}
      {prerequisites.length > 0 && <PrereQuisites prerequisites={prerequisites} setPrerequisites={setPrerequisites} updateFullCourseData={setFullCourseData}/>}
      {resources.length > 0 && <ResourceList resources={resources} setResources={setResources} updateFullCourseData={setFullCourseData}/>}
      <div className="buttons-container">
        {benefits.length === 0 && <button onClick={addBenefits}>Add Benefits</button>}
        {prerequisites.length === 0 && <button onClick={addPrerequisite}>Add Prerequisite</button>}
        {resources.length === 0 && <button onClick={addResource}>Add Resource</button>}
      </div>
      <button onClick={handleSave} className="saveCourse-Btn" disabled={btnDisabled}>Save</button>
    </div>
  );
};

export default CourseInfoForm;
