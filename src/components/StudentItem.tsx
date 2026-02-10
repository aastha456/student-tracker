// components/StudentItem.tsx
import type { Student } from "./types";
import { FaTrash } from "react-icons/fa";

//props for a single student
interface StudentItemProps {
  student: Student;
  onDelete: (id: string) => void;
}

const StudentItem = ({ student, onDelete }: StudentItemProps) => {
  return (
    <div className="student-item">
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
        onClick={() => onDelete(student.id)}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default StudentItem;
