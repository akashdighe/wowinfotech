import React, { useState } from 'react';
import './Styles.css';

const AddStateModal = ({ onClose, onSubmit }) => {
  const [newState, setNewState] = useState('');

  const handleInputChange = (e) => {
    setNewState(e.target.value);
  };

  const handleSubmit = () => {
       onSubmit(newState);
    onClose();
  };

  return (
    <div className="modal open">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <label>
          New State:
          <input type="text" value={newState} onChange={handleInputChange} />
        </label>
        <button onClick={handleSubmit}>Add State</button>
      </div>
    </div>
  );
};

export default AddStateModal;
