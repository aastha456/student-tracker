import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import useStudents from "../hooks/useStudents";
import './StudentList.css'

const StudentList = () => {
  const { students, deleteStudent } = useStudents();

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  return (
    <div className="student-tracker">
      <div className="student-list">
        {students.map((student) => (
          <div className="student-item" key={student.id}>
            <img
              src={student.photo || "https://via.placeholder.com/50"}
              alt={student.name}
              className="student-photo"
            />

            <div className="student-details">
              <p className="student-name">{student.name}</p>
              <p>Roll No: {student.rollNumber}</p>
              <p>Grade: {student.grade}</p>
              <p>Phone: {student.phoneNumber}</p>
              <p>Gender: {student.gender}</p>
            </div>

            <button
              className="student-item__delete"
              onClick={() => deleteStudent(student.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
