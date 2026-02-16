import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import type { Student as StudentType } from "./types";
import "./Student.css"

interface StudentProps {
  student: StudentType;
  onDelete: (id: string) => void;
}

const Student = ({ student, onDelete }: StudentProps) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/student/${student.id}`);
  };

  return (
    <div className="student-item">
      <div
        className="student-item__info"
        style={{ cursor: "pointer", width: "100%" }}
        onClick={handleNavigation}
      >
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
      </div>

      <button
        className="student-item__delete"
        onClick={() => onDelete(student.id)}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default Student;
