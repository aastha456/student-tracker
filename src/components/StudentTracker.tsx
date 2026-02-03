import { useState } from "react";
import "./StudentTracker.css";

type Gender = "Male" | "Female" | "Other";

interface Student {
  id: string;
  name: string;
  grade: string;
  phoneNumber: string;
  rollNumber: number;
  gender: Gender;
}

const INITIAL_STUDENTS: Student[] = [
  {
    id: "s1",
    name: "Soni Shah",
    grade: "A",
    phoneNumber: "9876543210",
    rollNumber: 101,
    gender: "Male",
  },
  {
    id: "s2",
    name: "Grishma Sunwar",
    grade: "B",
    phoneNumber: "9123456780",
    rollNumber: 102,
    gender: "Female",
  },
];

const StudentTracker = () => {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  return (
    <div className="student-tracker">
      <div>
        <h2>This is a form</h2>
        <form></form>
      </div>

      <div className="student-list">
        <h2>This is a student list</h2>

        {students.map((student) => (
          <div className="student-item" key={student.id}>
            <p>{student.name}</p>
            <p>Roll No: {student.rollNumber}</p>
            <p>Grade: {student.grade}</p>
            <p>Phone: {student.phoneNumber}</p>
            <p>Gender: {student.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentTracker;
