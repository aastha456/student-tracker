import { useState, useEffect} from "react";
import "./StudentTracker.css";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import type {Student} from './types'

//initila data shown in first load
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
  // loading the initial value from local storage
  // main state
  const [students, setStudents] = useState<Student[]>(() => {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      try {
        return JSON.parse(storedStudents);
      } catch (error) {
        console.error("JSON parse error", error);
        localStorage.setItem("students", JSON.stringify(INITIAL_STUDENTS));
        return INITIAL_STUDENTS;
      }
    } else {
      localStorage.setItem("students", JSON.stringify(INITIAL_STUDENTS));
      return INITIAL_STUDENTS;
    }
  });

  // Save students to localStorage whenever state changes
  useEffect(() => {
    if (students.length === 0){
      return;
    }
    localStorage.setItem("students", JSON.stringify(students))
  }, [students])

  // add student to the list 
  const addStudent =(student: Student) => {
    setStudents((prev) => [...prev, student]);
  }
  // delete student by id
  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="student-tracker">
      <StudentForm onAddStudent={addStudent}/>
      <StudentList students={students} onDelete={deleteStudent}/>
    </div>
  );
};

export default StudentTracker;
