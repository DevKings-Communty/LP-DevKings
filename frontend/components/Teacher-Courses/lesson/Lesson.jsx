import { useEffect, useState } from 'react';
import './lesson.css';
import LessonForm from './LessonForm/LessonForm';
import Quiz from '../Quiz/Quiz';
import { post } from '../../../services/teacherApi';
import Message from '../../Message/Message';
export default function Lesson({ course }) {
  const [lessons, setLessons] = useState([
    {
      title: '',
      description: '',
      videoFile: null,
      resources: [],
      isSaved: false
    }
  ]);
  const [toAddQuiz, setToaddQuiz] = useState(false);
  const [loader, setLoader] = useState(false)
  const [msg, setMsg] = useState(null);

  const showMessage = (message, type = 'info') => {
    setMsg({ message, type });
  };
  const LessonElements = lessons.map((lesson, index) => (
    <LessonForm
      id={index}
      lesson={lesson}
      key={index}
      delete={deleteLesson}
      save={saveLesson}
      updateLessons={setLessons}
      lessons={lessons}
    />
  ));

  useEffect(() => {
    if (lessons.length === 0) {
      addLesson();
    }
  }, [lessons]);

  function deleteLesson(id) {
    showMessage('Lesson deleted')
    setLessons(prev => prev.filter((_, index) => index !== id));
  }

  function addLesson() {
    setLessons(prev => [
      ...prev,
      {
        title: '',
        description: '',
        videoFile: null,
        resources: [],
        isSaved: false
      }
    ]);
  }

  async function saveLesson(index) {
    const toSave = lessons[index];
    setLoader(true)
    console.log()
    if (!toSave.title || !toSave.description || !toSave.videoFile) {
      showMessage('Please provide all the required fields', 'danger');
      setLoader(true)
      return;
    }
    if(toSave.description.length <= 6){
      showMessage('title must be more then 6 characteres', 'danger');
      setLoader(true)
      return;
    }
    if(toSave.title.length <= 10){
      showMessage('description must be more then 10 character', 'danger');
      setLoader(true)
      return;
    }
    const formData = new FormData();
    formData.append('title', toSave.title);
    formData.append('description', toSave.description);
    formData.append('resources', JSON.stringify(toSave.resources));
    formData.append('video_lesson', toSave.videoFile);

    try {
      const res = await post(`/lesson/${course._id}`, {}, formData, true);
      console.log(res);
      setLoader(true)
      showMessage('Lesson Saved Succesuflly', 'success')
      setLessons(prev =>
        prev.map((l, i) => (i === index ? { ...l, isSaved: true } : l))
      );
    } catch (err) {
        console.error(err);

        if (err.response && err.response.data && err.response.data.message) {
          showMessage(err.response.data.message, 'danger');
        } else {
          showMessage('Could not save this lesson. Something went wrong.', 'danger');
        }
      }
  }


    async function saveAllLessons() {
    for (let i = 0; i < lessons.length; i++) {
      if (!lessons[i].isSaved) {
        await saveLesson(i);
      }
    }
    setLessons(prev=>prev.map(l=>{
      return {...l,isSaved:true}
    }))
    showMessage('Your lessons Saved  Succefully', 'success');
  }

  function addQuiz() {
    const savedCount = lessons.filter(l => l.isSaved).length;
    if (savedCount === 0) {
      showMessage('Please save at least one lesson to create a quiz', 'info');
      return;
    }
    setToaddQuiz(true);
  }

  return (
    <>
    {msg && <Message
          message={msg.message}
          type={msg.type}
          onClose={() => setMsg(null)}
        />}
      <div className="lessons-container">
        <h2>Lessons Info</h2>
        {LessonElements}
        {loader && <div>Uploaing ....</div> }
        <div className="buttons-container">
          <button onClick={addQuiz}>Add Quiz</button>
          <button onClick={saveAllLessons}>Save All Lessons</button>
          <button onClick={addLesson}>Add Lesson</button>
        </div>
      </div>
      {toAddQuiz && <Quiz course={course} />}
    </>
  );
}
