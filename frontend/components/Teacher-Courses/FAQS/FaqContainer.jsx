import React from 'react';
import { deleteFaq } from '../../../pages/Teacher/api';

export default function FaqContainer({ faqs, onEdit, onDelete }) {
  const handleDelete = async (id) => {
    try {
      await deleteFaq(id);
      onDelete(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete FAQ");
    }
  };

  return (
    <div className="faq-container">
     <h3>Course FAQs</h3>
      <div className="faq-cards">
        {faqs.length === 0 && <p>No FAQs added yet.</p>}
      {faqs.map((faq, index) => (
        <div key={faq._id} className="faq-card">
          <h4>{index + 1}. {faq.question}</h4>
          <p>{faq.answer}</p>
          <div className="faq-actions">
            <button className='edit-btn' onClick={() => onEdit(faq)}>Edit</button>
            <button className='delete-btn' onClick={() => handleDelete(faq._id)}>Delete</button>
          </div>
        </div>
      ))}
      </div>
      <button className="Add-question" onClick={() => onEdit(null)}>Add FAQ</button>
    </div>
  );
}
