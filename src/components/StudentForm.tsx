import { useState } from "react";
import type { Student, Gender } from "./types";
import './StudentForm.css'

interface StudentFormProps {
  initialData?: Student;
  onSubmit: (data: Student) => void;
}

const StudentForm = ({ initialData, onSubmit }: StudentFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [grade, setGrade] = useState(initialData?.grade || "");
  const [phoneNumber, setPhoneNumber] = useState(initialData?.phoneNumber || "");
  const [rollNumber, setRollNumber] = useState<number | "">(
    initialData?.rollNumber || ""
  );
  const [gender, setGender] = useState<Gender>(
  initialData?.gender || "Male"
);
  const [photo, setPhoto] = useState(initialData?.photo || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const studentData: Student = {
      id: initialData?.id || crypto.randomUUID(),
      name,
      grade,
      phoneNumber,
      rollNumber: Number(rollNumber),
      gender,
      photo: photo || "https://via.placeholder.com/100",
    };

    onSubmit(studentData);
  };

  return (
    <div className="student-tracker">
      <form className="student-tracker-form" onSubmit={handleSubmit}>

        <h2 style={{ textAlign: "center" , fontWeight: "bold"}}>
          {initialData ? "Update Student" : "Add Student"}
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={e => setGrade(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          maxLength={10}
           onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setPhoneNumber(value);
          }}
          required
        />

        <input
          type="number"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) =>
            setRollNumber(e.target.value === "" ? "" : Number(e.target.value))
          }

          required
        />

        <select
          value={gender}
          onChange={(e) =>
            setGender(e.target.value as Gender)
          }
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={e => setPhoto(e.target.value)}
        />

        {photo && (
          <img
            src={photo}
            alt="Preview"
          />
        )}

        <button
          type="submit"
          className="student-tracker-form__submit"
        >
          {initialData ? "Update Student" : "Add Student"}
        </button>

      </form>
    </div>
  );
};

export default StudentForm;
