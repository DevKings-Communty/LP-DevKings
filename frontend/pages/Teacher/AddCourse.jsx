import { useState, useContext } from 'react';
import CourseInfoForm from '../../components/Teacher-Courses/CourseInfoForm/CourseInfoForm';
import Lesson from '../../components/Teacher-Courses/lesson/Lesson';
import TeacherSideBar from '../../components/TeacherSideBar/TeacherSideBar'
import './addcourse.css'
import logo from "../../public/logo.png"
import { AuthContext } from '../../context/AuthProvider';
  
import {get, post} from '../../services/teacherApi'
import Message from '../../components/Message/Message';
const AddCoursePage = () => {
  const [courseInfo, setCourseInfo] = useState({
    metaData:null,
    benefits:null,
    resources:null,
    prerequisites:null
  });
  const [msg, setMsg] = useState(null);

  const showMessage = (message, type = 'info') => {
    setMsg({ message, type });
  };
  const { user } = useContext(AuthContext);
  const [dataSaved, setDataSaved] = useState(false);
  console.log(courseInfo);
  const handleSubmit = (fullCourse) => {
      const formData = new FormData()
      // Add metaData fields
      formData.append('title', fullCourse.metaData.title);
      formData.append('description', fullCourse.metaData.description);
      formData.append('category', fullCourse.metaData.category);
      formData.append('price', fullCourse.metaData.price);

      // Add thumbnail file
      formData.append('thumbnail', fullCourse.metaData.thumbnail);

      // Add array fields as JSON strings
      formData.append('benefits', JSON.stringify(fullCourse.benefits));
      formData.append('prerequisites', JSON.stringify(fullCourse.prerequisites));
      formData.append('resources', JSON.stringify(fullCourse.resources));
      console.log(formData);
      post('/course',{},formData,true)
         .then(res=>{
          console.log(res.newCours)
          setCourseInfo(res.newCours)
          setDataSaved(true)
          showMessage('Course Data Saved Succefully Now you can add lessons to the course', 'success');
         })
         .catch(err=>console.log(err))
  };
  return (
      <div className='mainAddCourse'>
        {msg && <Message
          message={msg.message}
          type={msg.type}
          onClose={() => setMsg(null)}
        />}
        <TeacherSideBar logo={logo} />
      <div className="main-content">
        <header className="main-header">
                <h2>Add Courses:</h2>
                <div className="header-actions">
                  <span className="header-icon">⚙️</span>
                  <div className="user-profile">
                    {`${user.firstName} ${user.lastName}`}
                    <img src={user && user.profilePic} style={{width:'70px', height:'70px', borderRadius:'50%'}} alt="" />
                  </div>
                </div>
              </header>
        {
        !dataSaved?<CourseInfoForm onChange={setCourseInfo} onsubmit={handleSubmit} />: <Lesson course={courseInfo}/>
      }
      </div>
    </div>
  );
};

export default AddCoursePage;
