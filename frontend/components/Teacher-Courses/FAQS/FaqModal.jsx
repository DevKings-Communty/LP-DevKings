import { useState } from "react";
import { createFaq, updateFaq } from '../../../pages/Teacher/api';

export default function FaqModal({ courseId, faq, onClose, onSave }) {
  const [form, setForm] = useState({
    question: faq?.question || '',
    answer: faq?.answer || ''
  });

  const handleSubmit = async () => {
    if (!form.question || !form.answer) {
      return alert("Please fill in both fields");
    }

    try {
      const res = faq
        ? await updateFaq(faq._id, form)
        : await createFaq(courseId, form);

      onSave(res.data.faq);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to save FAQ");
      console.error(err);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{faq ? "Edit FAQ" : "Add FAQ"}</h2>

        <label>Question:</label>
        <input
          type="text"
          value={form.question}
          onChange={e => setForm({ ...form, question: e.target.value })}
        />

        <label>Answer:</label>
        <input
          type="text"
          value={form.answer}
          onChange={e => setForm({ ...form, answer: e.target.value })}
        />

        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
