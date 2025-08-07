export default function Question({ question, index, updateQuestion, addOption }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateQuestion(index, { ...question, [name]: value });
    };

    const handleOptionChange = (optionIndex, value) => {
        const updatedOptions = [...question.options];
        updatedOptions[optionIndex] = value;
        updateQuestion(index, { ...question, options: updatedOptions });
    };

    function removeOption(optionIndex){
        const updatedOptions = question.options.filter((op,i)=>i!==optionIndex);
        updateQuestion(index, {...question, options:updatedOptions})
        
    }

    return (
        <div className="question-card">
            <div className="question">
                <div className="input-group" id='question'>
                    <label>{`Question ${index + 1}:`}</label>
                    <textarea
                        name="question"
                        placeholder={`Question ${index + 1}`}
                        value={question.question}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Answer</label>
                    <input
                        name="correctAnswer"
                        placeholder="correct Answer"
                        type="text"
                        value={question.correctAnswer}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="options-container">
                {question.options.map((opt, i) => (
                    <div key={i} className="option">
                        <label>Option {i + 1}</label>
                        <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleOptionChange(i, e.target.value)}
                        />
                        <button
                            type="button"
                            className="deleteButton"
                            onClick={() => removeOption(i)}
                            >
                            X
                        </button>
                    </div>
                ))}
                <div className="button-container">
                    <button type="button" onClick={() => addOption(index)}><i className="fas fa-plus"></i></button>
                </div>
            </div>
        </div>
    );
}
