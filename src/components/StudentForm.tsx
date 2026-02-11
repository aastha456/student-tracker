// components/StudentForm.tsx
import { useState } from "react";
import type { Gender, Student } from "./types";

//props type: parent will give a function that accepts student object
interface StudentFormProps {
  onAddStudent: (student: Student) => void;
}

const StudentForm = ({ onAddStudent }: StudentFormProps) => {
  // Local state for form inputs
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rollNumber, setRollNumber] = useState<number | "">("");
  const [gender, setGender] = useState<Gender>("Male");

  const[photoPreview, setPhotoPreview] = useState<string>("");

  // Runs when form is submitted
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();// stop page reload
    
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
    onAddStudent(newStudent);

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

  return (
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
        onChange={(e) =>{
          const value = e.target.value.replace(/\D/g, "");
          setPhoneNumber(value)}}
      />

      <select value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
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
  );
};

export default StudentForm;
