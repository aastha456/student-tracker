import { useState, useEffect } from "react";
import "./StudentTracker.css";
import type { Student, Gender } from "./types";

const INITIAL_STUDENTS: Student[] = [
  {
    id: "s1",
    name: "Ram Shakya",
    grade: "A",
    phoneNumber: "9876543210",
    rollNumber: 101,
    gender: "Male",
    photo: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "s2",
    name: "Grishma Sunwar",
    grade: "B",
    phoneNumber: "9123456780",
    rollNumber: 102,
    gender: "Female",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "s3",
    name: "Shyam Tiwari",
    grade: "A",
    phoneNumber: "9123456780",
    rollNumber: 103,
    gender: "Male",
    photo: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
  },
];

const StudentTracker = () => {
  const [students, setStudents] = useState<Student[]>(() => {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      try {
        return JSON.parse(storedStudents);
      } catch (error) {
        console.error("JSON parse error", error);
        return INITIAL_STUDENTS;
      }
    }
    return INITIAL_STUDENTS;
  });

  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rollNumber, setRollNumber] = useState<number | "">("");
  const [gender, setGender] = useState<Gender>("Male");

  // Save students to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (rollNumber === "" || rollNumber <= 0) {
      alert("Valid roll number is required");
      return;
    }

    const studentToAdd: Student = {
      id: crypto.randomUUID(),
      name,
      grade,
      phoneNumber,
      rollNumber: Number(rollNumber),
      gender,
      photo: "https://via.placeholder.com/50",
    };

    setStudents((prev) => [...prev, studentToAdd]);

    // Reset form
    setName("");
    setGrade("");
    setPhoneNumber("");
    setRollNumber("");
    setGender("Male");
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="student-tracker">
      <div>
        <h2>Student Form</h2>
        <form className="student-tracker-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Student Name ..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Roll number"
            value={rollNumber}
            onChange={(e) =>
              setRollNumber(e.target.value === "" ? "" : Number(e.target.value))
            }
          />

          <input
            type="text"
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            maxLength={10}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
          />

          <select value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit" className="student-tracker-form__submit">
            Submit
          </button>
        </form>
      </div>

      <div className="student-list">
        <h2>Student List</h2>
        {students.map((student) => (
          <div className="student-item" key={student.id}>
            <img src={student.photo || "https://via.placeholder.com/50"} alt={student.name} />
            <div>
              <p>{student.name}</p>
              <p>Roll No: {student.rollNumber}</p>
              <p>Grade: {student.grade}</p>
              <p>Phone: {student.phoneNumber}</p>
              <p>Gender: {student.gender}</p>
            </div>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentTracker;
