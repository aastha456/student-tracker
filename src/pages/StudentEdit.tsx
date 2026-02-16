// import { useMemo, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import type { Student } from "../components/types";
// import "./StudentEdit.css";

// const StudentEdit = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const student = useMemo(() => {
//     const stored = localStorage.getItem("students");
//     if (stored) {
//       const parsed: Student[] = JSON.parse(stored);
//       return parsed.find((student) => student.id === id);
//     }
//     return null;
//   }, [id]);

//   const [form, setForm] = useState<Student | null>(student ? student : null);

//   if (!student) {
//     return <div>Student Not found</div>;
//   }

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) =>
//       prev
//         ? { ...prev, [name]: name === "rollNumber" ? Number(value) : value }
//         : null,
//     );
//   };

//   const handleSave = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form) return;
//     try {
//       const data = localStorage.getItem("students");
//       if (data) {
//         const list: Student[] = JSON.parse(data);
//         const updatedList = list.map((student) =>
//           student.id === form.id ? form : student,
//         );
//         localStorage.setItem("students", JSON.stringify(updatedList));
//       }
//       navigate("/");
//     } catch (error) {
//       console.error("Error loading the data", error);
//     }
//   };

//   const handleCancel = () => {
//     navigate(`/student/${id}`);
//   };

//   return (
//     <div className="student-tracker-edit">
//       <form className="student-tracker-form" onSubmit={handleSave}>
//       <div className="student-tracker-form__group">
//         <label className="student-tracker-form__label">Name</label>
//         <input
//           className="student-tracker-form__input"
//           type="text"
//           name="name"
//           placeholder="Enter Student Name ..."
//           value={form?.name || ""}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="student-tracker-form__group">
//         <label className="student-tracker-form__label">Roll Number</label>
//         <input
//           className="student-tracker-form__input"
//           type="number"
//           name="rollNumber"
//           placeholder="Roll number"
//           value={form?.rollNumber ?? 0}
//           onChange={handleChange}
//           min="1"
//           required
//         />
//       </div>

//       <div className="student-tracker-form__group">
//         <label className="student-tracker-form__label">Grade</label>
//         <input
//           className="student-tracker-form__input"
//           type="text"
//           name="grade"
//           placeholder="Grade"
//           value={form?.grade || ""}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="student-tracker-form__group">
//         <label className="student-tracker-form__label">Phone Number</label>
//         <input
//           className="student-tracker-form__input"
//           type="text"
//           name="phoneNumber"
//           placeholder="Phone Number"
//           maxLength={10}
//           value={form?.phoneNumber || ""}
//           onChange={(e) =>
//             setForm((prev) =>
//               prev
//                 ? { ...prev, phoneNumber: e.target.value.replace(/\D/g, "") }
//                 : null,
//             )
//           }
//         />
//       </div>

//       <div className="student-tracker-form__group">
//         <label className="student-tracker-form__label">Gender</label>
//         <select
//           className="student-tracker-form__select"
//           name="gender"
//           value={form?.gender || "Other"}
//           onChange={handleChange}
//         >
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>

//       <div className="student-tracker-form__buttons">
//         <button type="submit" className="student-tracker-form__submit">
//           Save Changes
//         </button>
//         <button
//           type="button"
//           onClick={handleCancel}
//           className="student-tracker-form__cancel"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>

//     </div>
    
//   );
// };

// export default StudentEdit;

// // import { useNavigate, useParams } from "react-router";
// // import StudentForm from "../components/StudentForm";
// // import useStudents from "../hooks/useStudents";
// // import "./StudentEdit.css";

// // const StudentEdit = () => {
// //   const { students, updateStudent } = useStudents();
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   // Find the student by ID
// //   const student = students.find((s) => s.id === id);

// //   if (!student) {
// //     return <div>Student not found</div>;
// //   }

// //   return (
// //     <div className="student-tracker-edit">

// //       {/* Use the reusable StudentForm */}
// //       <StudentForm
// //         initialData={student} // Prefill form for edit
// //         onSubmit={(updatedStudent) => {
// //           updateStudent(updatedStudent); // Update via hook
// //           navigate(`/student/${id}`); // Go back to detail page
// //         }}
// //       />

// //       {/* Cancel button to go back to detail */}
// //       <div className="student-tracker-form__buttons">
// //          <button
// //         type="button"
// //         onClick={() => navigate(`/student/${id}`)}
// //         className="student-tracker-form__cancel"
// //       >
// //         Cancel
// //       </button>

// //       </div>
     
// //     </div>
// //   );
// // };

// // export default StudentEdit;

import { useParams, useNavigate } from "react-router-dom";
import { useStudentContext } from "../context/StudentContextProvider";
import StudentForm from "../components/StudentForm";
import type { Student } from "../components/types";

const StudentEdit = () => {
  const { id } = useParams();
  const { students, updateStudent } = useStudentContext();
  const navigate = useNavigate();

  const student = students.find(s => s.id === id);

  if (!student) return <div>Student Not Found</div>;

  const handleUpdate = (data: Student) => {
    updateStudent(data);
    navigate(`/student/${id}`);
  };

  return (
      <StudentForm
      initialData={student}
      onSubmit={handleUpdate}
    /> 
  );
};

export default StudentEdit;


