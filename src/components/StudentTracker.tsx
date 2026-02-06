import { useState } from "react";
import "./StudentTracker.css";
import { FaTrash } from "react-icons/fa";

type Gender = "Male" | "Female" | "Other";

interface Student {
  id: string;
  name: string;
  grade: string;
  phoneNumber: string;
  rollNumber: number;
  gender: Gender;
  photo?: string;
}

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
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rollNumber, setRollNumber] = useState<number>();
  const [gender, setGender] = useState<Gender>("Male");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // console.clear();
    e.preventDefault();

    if (name.trim() === ""){
      console.warn("Name is empty");
      alert ("Name is required");
      return;
    }

    if (!rollNumber || rollNumber <= 0 ){
      console.log("Invalid roll number");
      alert("Rollnumber is required ");
      return;
    }

    const studentToAdd: Student = {
      id: crypto.randomUUID(),
      name,
      grade,
      phoneNumber,
      rollNumber,
      gender,
      photo: "https://via.placeholder.com/50"
    };

    setStudents((prev) => [...prev, studentToAdd]);
    setName("");
    setGender("Male");
    setGrade("");
    setPhoneNumber("");
    setRollNumber(undefined);


  }

  const handleDelete = (id: string) => {
     const updateStudent = students.filter(student => student.id !== id);
     setStudents(updateStudent);

  }

  return (
    <div className="student-tracker">
      <div>
        
        <form className="student-tracker-form" onSubmit={handleSubmit}>
          <input type="text"
          placeholder="Enter Student Name ..."
          value={name}
          onChange={(e) => setName(e.target.value)} />

          <input type="number"
          placeholder="Roll number"
          value={rollNumber}
          onChange={(e) => setRollNumber(Number(e.target.value))} />

          <input type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)} />

          <input type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)} />

          <select className="student-tracker-form__input" value={gender}
          onChange={(e) => setGender(e.target.value as Gender)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button type="submit" className="student-tracker-form__submit">Submit</button>
        </form>
      </div>

      <div className="student-list">
        <h2>Student list</h2>

        {students.map((student) => (
          <div className="student-item" key={student.id}>
            <img src={student.photo || "https://via.placeholder.com/50"} alt={student.name} className="student-photo"/>
            <div className="student-details">
            <p className="student-name">{student.name}</p>
            <p>Roll No: {student.rollNumber}</p>
            <p>Grade: {student.grade}</p>
            <p>Phone: {student.phoneNumber}</p>
            <p>Gender: {student.gender}</p>
            </div>
            <button onClick={() => handleDelete(student.id)} className="student-item__delete"><FaTrash /></button>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default StudentTracker;
