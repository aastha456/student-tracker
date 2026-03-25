import { useNavigate } from "react-router";
import { createStudent } from "../store/slices/studentSlice";
import { useAppDispatch } from "../hooks/studentHooks";
import StudentForm from "../components/StudentForm";
import type { Student } from "../components/types";


const StudentFormPage = () => {
  const dispatch = useAppDispatch();
  
  const navigate = useNavigate();

  const handleAdd = (data: Student) => {
    dispatch(createStudent(data));
    navigate("/");
  };

  return (
      <StudentForm onSubmit={handleAdd} />
  )
};

export default StudentFormPage;
