import { useAppSelector, useAppDispatch } from "../hooks/studentHooks";
import { deleteStudent } from "../store/slices/studentSlice";
import { useNavigate, useParams } from "react-router";
import './StudentDetailView.css'

const StudentDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const {deleteStudent} = useStudents();
  const dispatch = useAppDispatch();

  // const student = useMemo(() => {
  //   const stored = localStorage.getItem("students");
  //   if (stored){
  //     const parsed: Student[] = JSON.parse(stored);
  //     return parsed.find((student) => student._id === id);
  //   }
  //   return null;
  // },[id]);
  const students = useAppSelector(state => state.students.students);
const student = students.find(s => s._id === id);

  if(!student){
    return <div>Student not found</div>
  }

  const handleEdit = () => {
    navigate(`/student/${id}/edit`)
  }

  const handleDelete = () => {
    dispatch(deleteStudent(student._id));
    navigate("/");
  }

  return (
    <div className="student-detail">
        <img src={student.photo || "https://via.placeholder.com/50"} 
        alt={student.name} />
            <div className="student-detail__info">
              <p>{student.name}</p>
              <p>Roll No: {student.rollNumber}</p>
              <p>Grade: {student.grade}</p>
              <p>Phone: {student.phoneNumber}</p>
              <p>Gender: {student.gender}</p>
            </div>
            <div className="student-detail__actions">
            <button className="student-detail__edit"onClick={handleEdit}>Edit</button>
            <button className="student-detail__delete" onClick={handleDelete}>Delete</button>
            </div>         
    </div>
  )
}

export default StudentDetailView
