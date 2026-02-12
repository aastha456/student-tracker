import { useState, useEffect } from "react";
import type { Gender, Student } from "../components/types";
import useStudents from "../hooks/useStudents";
import { FaTrash } from "react-icons/fa";
import './StudentForm.css'

const StudentForm = () => {
  const { students, addStudent, deleteStudent } = useStudents();
  // Local state for form inputs
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rollNumber, setRollNumber] = useState<number | "">("");
  const [gender, setGender] = useState<Gender>("Male");

  const [photoPreview, setPhotoPreview] = useState<string>("");

  // Runs when form is submitted
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // stop page reload

    //simple validation
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (rollNumber === "" || rollNumber <= 0) {
      alert("Valid roll number required");
      return;
    }
    // create student object
    const newStudent: Student = {
      id: crypto.randomUUID(),
      name,
      grade,
      phoneNumber,
      rollNumber,
      gender,
      photo: photoPreview || "https://via.placeholder.com/50",
    };
    //send student data to parent component
    addStudent(newStudent);

    // reset
    setName("");
    setGrade("");
    setPhoneNumber("");
    setRollNumber("");
    setGender("Male");
    setPhotoPreview("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
    setPhotoPreview(imageUrl);
  };

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  return (
    <div className="student-tracker">
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
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setPhoneNumber(value);
          }}
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as Gender)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* Image preview */}
        {photoPreview && (
          <img
            src={photoPreview}
            alt="Preview"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50%",
              alignSelf: "center",
            }}
          />
        )}

        <button type="submit" className="student-tracker-form__submit">
          Submit
        </button>
      </form>
      <div>
        <div className="student-details">
          {students.map((student) => (
            <div key={student.id} className="student-item">
              <p className="student-name">{student.name}</p>
              <p>Roll No: {student.rollNumber}</p>
              <p>Grade: {student.grade}</p>
              <p>Phone: {student.phoneNumber}</p>
              <p>Gender: {student.gender}</p>

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
    </div>
  );
};

export default StudentForm;
