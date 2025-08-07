import { useState, useEffect } from "react";
import { fetchQuiz } from "../../../../pages/Teacher/api";

export default function QuizModal({ courseId, questionIndex, onClose, onSave }) {
  const [quizId, setQuizId] = useState(null);
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    fetchQuiz(courseId).then(res => {
      if (res.data.length > 0) {
        setQuiz(res.data[0].questions);
        setQuizId(res.data[0]._id);
      }
    });
  }, [courseId]);

  const isEdit = questionIndex !== null;
  const existingQuestion = isEdit ? quiz[questionIndex] : null;

  const [form, setForm] = useState({
    question: '',
    correctAnswer: '',
    options: ['', '', '', '']
  });

  useEffect(() => {
    if (existingQuestion) {
      setForm({
        question: existingQuestion.question,
        correctAnswer: existingQuestion.correctAnswer,
        options: [...existingQuestion.options]
      });
    }
  }, [existingQuestion]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...form.options];
    updatedOptions[index] = value;
    setForm({ ...form, options: updatedOptions });
  };

  const addOption = () => {
    setForm({ ...form, options: [...form.options, ''] });
  };

  const removeOption = (index) => {
    const updatedOptions = form.options.filter((_, i) => i !== index);
    setForm({ ...form, options: updatedOptions });
  };

  const handleSubmit = () => {
    onSave(questionIndex, form, quizId);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{isEdit ? "Edit" : "Add"} Question</h2>

        <label>Question:</label>
        <input
          type="text"
          value={form.question}
          onChange={e => setForm({ ...form, question: e.target.value })}
        />

        <label>Correct Answer:</label>
        <input
          type="text"
          value={form.correctAnswer}
          onChange={e => setForm({ ...form, correctAnswer: e.target.value })}
        />

        <label>Options:</label>
        {form.options.map((option, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '5px' }} className="option-container">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => removeOption(index)}
              style={{ marginLeft: '5px' }}
            >
              <i class="fas fa-times"></i> 
            </button>
          </div>
        ))}
        <button type="button" onClick={addOption}><i class="fas fa-plus"></i> Add Option</button>

        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

