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


