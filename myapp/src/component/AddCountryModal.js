// AddCountryModal.js
import React, { useState } from 'react';
import './Styles.css';

const AddCountryModal = ({ onClose, onSubmit, onAddCountry }) => {
    const [newCountry, setNewCountry] = useState('');

    const handleInputChange = (e) => {
        setNewCountry(e.target.value);
    };

    const handleSubmit = () => {
        onAddCountry(newCountry); // Call the callback function to add the new country
        onSubmit(newCountry);
        onClose();
    };

    return (
        <div className="modal open">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <label>
                    New Country:
                    <input type="text" value={newCountry} onChange={handleInputChange} />
                </label>
                <button onClick={handleSubmit}>Add Country</button>
            </div>
        </div>
    );
};

export default AddCountryModal;
