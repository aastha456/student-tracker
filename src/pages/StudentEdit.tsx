import { useParams,useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/studentHooks";
import { updateStudent } from "../store/slices/studentSlice";
import StudentForm from "../components/StudentForm";
import type { Student } from "../components/types";

const StudentEdit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const students = useAppSelector(state => state.students.students);

  const student = students.find(s => s._id === id);

  if (!student) return <div>Student Not Found</div>;

  const handleUpdate = (data: Student) => {
    dispatch(updateStudent(data));
    navigate(`/student/${student._id}`);
  };

  return (
      <StudentForm
      initialData={student}
      onSubmit={handleUpdate}
    /> 
  );
};

export default StudentEdit;


