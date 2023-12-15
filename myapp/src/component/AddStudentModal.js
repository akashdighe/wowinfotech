
import React, { useEffect, useState } from 'react';
import AddCountryModal from './AddCountryModal';
import AddStateModal from './AddStateModal';

const AddStudentModal = ({ isOpen, onClose, onAdd, selectedStudent }) => {
    const [newStudent, setNewStudent] = useState({
        firstName: '',
        lastName: '',
        hobbies: [],
        gender: 'Male',
        country: 'USA',
        state: 'New York',
    });

    useEffect(() => {
        // Set the initial state based on the selected student when the modal is opened for editing
        if (selectedStudent) {
            setNewStudent(selectedStudent);
        } else {
            // Reset the state if there is no selected student (i.e., when opening for adding)
            setNewStudent({
                firstName: '',
                lastName: '',
                hobbies: [],
                gender: 'Male',
                country: 'USA',
                state: 'New York',
            });
        }
    }, [selectedStudent]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent({
            ...newStudent,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setNewStudent({
            ...newStudent,
            [name]: checked ? [...newStudent[name], e.target.value] : newStudent[name].filter(hobby => hobby !== e.target.value),
        });
    };

    const handleAddStudent = () => {
        onAdd(newStudent);
        onClose();
        // Reset the state after adding or editing
        setNewStudent({
            firstName: '',
            lastName: '',
            hobbies: [],
            gender: 'Male',
            country: 'USA',
            state: 'New York',
        });
    };
    

    const [isAddCountryModalOpen, setAddCountryModalOpen] = useState(false);
    const [isAddStateModalOpen, setAddStateModalOpen] = useState(false);

    

    const handleAddCountry = () => {
        setAddCountryModalOpen(true);
    };

    const handleAddState = () => {
        setAddStateModalOpen(true);
    };

    const handleAddCountryModalClose = () => {
        setAddCountryModalOpen(false);
    };

    const handleAddStateModalClose = () => {
        setAddStateModalOpen(false);
    };

    const handleAddCountryModalSubmit = (newCountry) => {
        setNewStudent({ ...newStudent, country: newCountry });
        setAddCountryModalOpen(false);
    };

    const handleAddStateModalSubmit = (newState) => {
        setNewStudent({ ...newStudent, state: newState });
        setAddStateModalOpen(false);
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <div className='sub-modals'>
                    <div>
                        <span className="close" onClick={onClose}>&times;</span>
                        <div>
                            <label>
                                First Name:
                            </label>
                            <input type="text" name="firstName" value={newStudent.firstName} onChange={handleInputChange} />
                        </div>

                        <label>
                            Last Name:
                        </label>
                        <input type="text" name="lastName" value={newStudent.lastName} onChange={handleInputChange} />

                        <div>
                            Hobbies:
                            <label>
                                <input type="checkbox" name="hobbies" value="Reading" checked={newStudent.hobbies.includes('Reading')} onChange={handleCheckboxChange} /> Reading
                                <input type="checkbox" name="hobbies" value="Swimming" checked={newStudent.hobbies.includes('Swimming')} onChange={handleCheckboxChange} /> Swimming
                            </label>
                        </div>
                    </div>
                    <div>
                        <label>
                            Gender:
                            <label>
                                <input type="radio" name="gender" value="Male" checked={newStudent.gender === 'Male'} onChange={handleInputChange} />
                                Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="Female" checked={newStudent.gender === 'Female'} onChange={handleInputChange} />
                                Female
                            </label>
                        </label>
                        <div>
                         <div>
                         Country:
                            <label>
                                <select name="country" value={newStudent.country} onChange={handleInputChange}>
                                    <option value="USA">USA</option>
                                    <option value="Canada">Canada</option>
                                </select>&nbsp;
                                <button onClick={handleAddCountry}>+</button>
                            </label>
                         </div>
                            State:
                            <label>
                                <select name="state" value={newStudent.state} onChange={handleInputChange}>
                                    <option value="New York">New York</option>
                                    <option value="Ontario">Ontario</option>
                                </select>&nbsp;
                                <button onClick={handleAddState}>+</button>
                            </label>
                        </div>
                    </div>
                </div>
                <button  onClick={handleAddStudent}>Add Student</button>

            </div>


            {isAddCountryModalOpen && (
                <AddCountryModal onClose={handleAddCountryModalClose} onSubmit={handleAddCountryModalSubmit} />
            )}

            {isAddStateModalOpen && (
                <AddStateModal onClose={handleAddStateModalClose} onSubmit={handleAddStateModalSubmit} />
            )}
        </div>
    );
};

export default AddStudentModal;
