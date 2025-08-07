
const LessonFormList = ({ lessons, setLessons }) => {
  const addLesson = () => {
    setLessons([...lessons, { video: null, name: '', description: '', resourceName: '', resourcePdf: null }]);
  };
  const updateLesson = (index, updatedLesson) => {
    const newLessons = [...lessons];
    newLessons[index] = updatedLesson;
    setLessons(newLessons);
  };
  return (
    <div>
      {lessons.map((lesson, index) => (
        <LessonForm key={index} data={lesson} onChange={(updated) => updateLesson(index, updated)} />
      ))}
      <button onClick={addLesson}>Add Lesson</button>
    </div>
  );
};

export default LessonFormList