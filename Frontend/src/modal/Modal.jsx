import React, { useState } from 'react';


const Modal = ({ item, handleEdit, closeModal }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const handleSubmit = () => {
    handleEdit(item.id, { title, description });
    closeModal();
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="modal" onClick={handleClickOutside}>
      <div className="modal-content">
        <h2>Edit Todo</h2>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleSubmit}>Save Changes</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
