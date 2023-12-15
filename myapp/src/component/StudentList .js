import React, { useEffect, useState } from 'react';
import AddStudentModal from './AddStudentModal';
import './Styles.css';

const StudentList = () => {

    
    const [students, setStudents] = useState(
        JSON.parse(localStorage.getItem('students')) || [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                hobbies: ['Reading', 'Swimming'],
                gender: 'Male',
                country: 'USA',
                state: 'New York',
            },
            {
                id: 2,
                firstName: 'Jane',
                lastName: 'Smith',
                hobbies: ['Painting', 'Traveling'],
                gender: 'Female',
                country: 'Canada',
                state: 'Ontario',
            },
        ]
    );
    useEffect(() => {
        // Update local storage whenever students change
        localStorage.setItem('students', JSON.stringify(students));
    }, [students]);

    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleAddModalOpen = () => {
        setAddModalOpen(true);
        setSelectedStudent(null);
    };

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setAddModalOpen(true);
    };

    const handleAddModalClose = () => {
        setAddModalOpen(false);
        setSelectedStudent(null);
    };

    const handleAddStudent = (newStudent) => {
        if (selectedStudent) {
            const updatedStudents = students.map((student) =>
                student.id === selectedStudent.id ? { ...student, ...newStudent } : student
            );
            setStudents(updatedStudents);
        } else {
            setStudents([...students, { id: Date.now(), ...newStudent }]);
        }

        handleAddModalClose();
    };

    const handleDelete = (id) => {
        const updatedStudents = students.filter((student) => student.id !== id);
        setStudents(updatedStudents);
    };

    return (
        <div>
            <button onClick={handleAddModalOpen}>Add Student</button>

            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Hobbies</th>
                        <th>Gender</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.hobbies}</td>
                            <td>{student.gender}</td>
                            <td>{student.country}</td>
                            <td>{student.state}</td>
                            <td>
                                <button onClick={() => handleEdit(student)}>Edit</button> &nbsp;
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AddStudentModal
                isOpen={isAddModalOpen}
                onClose={handleAddModalClose}
                onAdd={handleAddStudent}
                selectedStudent={selectedStudent}
            />
        </div>
    );
};

export default StudentList;
