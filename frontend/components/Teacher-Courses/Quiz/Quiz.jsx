import { useState } from 'react';
import Question from './Question';
import './quiz.css';
import { post } from '../../../services/teacherApi'
import Message from '../../Message/Message';
export default function Quiz({course}) {
    const [questions, setQuestions] = useState([
        {
            question: '',
            correctAnswer: '',
            options: ['']
        }
    ]);
    const [msg, setMsg] = useState(null);

    const showMessage = (message, type = 'info') => {
        setMsg({ message, type });
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                question: '',
                correctAnswer: '',
                options: ['']
            }
        ]);
    };

    const updateQuestion = (index, updatedQuestion) => {
        const newQuestions = [...questions];
        newQuestions[index] = updatedQuestion;
        setQuestions(newQuestions);
    };

    const addOption = (index) => {
        const newQuestions = [...questions];
        newQuestions[index].options.push('');
        setQuestions(newQuestions);
    };

    const handleSave = () => {
  console.log('Quiz:', questions);

  post(`/course/${course._id}/Quiz`, {}, { questions }, false)
    .then(res => {
      showMessage('Quiz saved successfully!','success');
    })
    .catch(err => {
      console.error(err);

      if (err.response && err.response.data && err.response.data.message) {
        showMessage(`Error: ${err.response.data.message}`,'danger');
      } else {
        showMessage('Something went wrong while saving the quiz.','danger');
      }
    });
};

    return (
        <div className="quiz-container">
            {msg && <Message
          message={msg.message}
          type={msg.type}
          onClose={() => setMsg(null)}
        />}
            <h2>Quiz Info</h2>
            <div className="questions-container">
                {questions.map((q, i) => (
                    <Question
                        key={i}
                        index={i}
                        question={q}
                        updateQuestion={updateQuestion}
                        addOption={addOption}
                    />
                ))}
            </div>
            <div className="button-container parent">
                <button type="button" onClick={addQuestion}>Add Question</button>
                <button type="button" className='save' onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}
