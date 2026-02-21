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
