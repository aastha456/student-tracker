import {useState, useEffect } from 'react'
import type {Student} from'../components/types'

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
const useStudents = () => {
    const [students, setStudents] = useState<Student[]>(() => {
    const stored = localStorage.getItem("students");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        localStorage.setItem("students", JSON.stringify(INITIAL_STUDENTS));
        return INITIAL_STUDENTS;
      }
    }
    localStorage.setItem("students", JSON.stringify(INITIAL_STUDENTS));
    return INITIAL_STUDENTS;
  });
  
  useEffect(() => {
    // if (students.length === 0){
    //   return;
    // }
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

  const updateStudent = (updated: Student) => {
  setStudents(prev =>
    prev.map(student =>
      student.id === updated.id ? updated : student
    )
  );
};
  return (
    {updateStudent, addStudent, deleteStudent, students, setStudents}
  )
}

export default useStudents;
