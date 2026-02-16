// import { useState } from "react";
// import "./StudentFormPage.css";
// import useStudents from "../hooks/useStudents";
// import type { Student, Gender } from "../components/types";
// import { MdDelete } from "react-icons/md";

// const StudentFormPage = () => {
//   const { students, setStudents, deleteStudent} = useStudents(); 

//   const [name, setName] = useState("");
//   const [rollNumber, setRollNumber] = useState(0);
//   const [grade, setGrade] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [gender, setGender] = useState<Gender>("Male");

//   // useEffect(() => {
//   //   localStorage.setItem("students", JSON.stringify(students));
//   // }, [students]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name.trim() || rollNumber <= 0) {
//       alert("Name and valid roll number (>0) required!");
//       return;
//     }

//     const newStudent: Student = {
//       id: crypto.randomUUID(),
//       name,
//       rollNumber,
//       grade,
//       phoneNumber,
//       gender,
//       photo: "https://via.placeholder.com/80",
//     };

//     setStudents(prev => [...prev, newStudent]);
//     setName("");
//     setRollNumber(0);
//     setGrade("");
//     setPhoneNumber("");
//     setGender("Male");
//   };

//   return (
//     <div>
//       <form className="student-tracker-form" onSubmit={handleSubmit}>
//         <div className="student-tracker-form__group">
//           <label className="student-tracker-form__label">Name</label>
//           <input
//             className="student-tracker-form__input"
//             type="text"
//             placeholder="Enter Student Name ..."
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="student-tracker-form__group">
//           <label className="student-tracker-form__label">Roll Number</label>
//           <input
//             className="student-tracker-form__input"
//             type="number"
//             placeholder="Roll number"
//             value={rollNumber || ""}
//             onChange={(e) => setRollNumber(Number(e.target.value) || 0)}
//             min="1"
//             required
//           />
//         </div>

//         <div className="student-tracker-form__group">
//           <label className="student-tracker-form__label">Grade</label>
//           <input
//             className="student-tracker-form__input"
//             type="text"
//             placeholder="Grade"
//             value={grade}
//             onChange={(e) => setGrade(e.target.value)}
//           />
//         </div>

//         <div className="student-tracker-form__group">
//           <label className="student-tracker-form__label">Phone Number</label>
//           <input
//             className="student-tracker-form__input"
//             type="text"
//             placeholder="Phone Number"
//             maxLength={10}
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
//           />
//         </div>

//         <div className="student-tracker-form__group">
//           <label className="student-tracker-form__label">Gender</label>
//           <select
//             className="student-tracker-form__select"
//             value={gender}
//             onChange={(e) => setGender(e.target.value as Gender)}
//           >
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <button type="submit" className="student-tracker-form__submit">
//           Submit
//         </button>
//       </form>

//       <div className="student-item-list" style={{ marginTop: "2rem" }}>
//         {students.map((student) => (
//           <div key={student.id} className="student-item">
//             <div className="student-item__info" title="Click for details">
//               <h3>{student.name}</h3>
//               <p>
//                 Roll: {student.rollNumber} | Grade: {student.grade || "-"} | {student.gender}
//               </p>
//             </div>
//             <button
//               className="student-item__delete"
//               onClick={() => deleteStudent(student.id)}
//             >
//               <MdDelete color="red" size={24} />
//             </button>
//           </div>
//         ))}

//         {students.length === 0 && <p style={{ textAlign: "center", color: "#888" }}>No students yet. Add one!</p>}
//       </div>
//     </div>
//   );
// };

// export default StudentFormPage;

import { useNavigate } from "react-router";
import { useStudentContext } from "../context/StudentContextProvider";
import StudentForm from "../components/StudentForm";
import type { Student } from "../components/types";

const StudentFormPage = () => {
  const { addStudent } = useStudentContext();
  const navigate = useNavigate();

  const handleAdd = (data: Student) => {
    addStudent(data);
    navigate("/");
  };

  return (
      <StudentForm onSubmit={handleAdd} />
  )
};

export default StudentFormPage;
