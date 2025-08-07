export default function QuizContainer({ quiz, onEdit, onDelete, onAdd }) {
  return (
    <div className="quiz-container-x">
      <h3 className="quiz-heading">Quiz Questions</h3>
      {quiz.map((q, index) => (
        <div key={index} className="quiz-card">
          <div className="quiz-info">
            <h4>{index + 1}. {q.question}</h4>
            <p><strong>Correct Answer:</strong><span className="quiz-correct-answer"> {q.correctAnswer}</span> </p>
            <ul>
              {q.options.map((opt, idx) => (
                <li key={idx} className={q.correctAnswer===opt?'correct-option':''}> {opt}</li>
              ))}
            </ul>
          </div>
          <div className="quiz-actions">
            <button onClick={() => onEdit(index)} className="edit-btn">Edit</button>
            <button onClick={() => onDelete(index)} className="delete-btn">Delete</button>
          </div>
        </div>
      ))}
      <button onClick={() => onEdit(null)} className="Add-question"> Add Question</button>
    </div>
  );
}
