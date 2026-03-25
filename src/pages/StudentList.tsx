import { useAppSelector, useAppDispatch } from "../hooks/studentHooks";
import { deleteStudent } from "../store/slices/studentSlice";
import { useEffect } from "react";
import { fetchAllStudents } from "../store/slices/studentSlice";
import Student from "../components/Student";
import "./StudentList.css"

const StudentList = () => {
  const {students: studentFromRedux, loading} = useAppSelector(state => state.students);
  const dispatch = useAppDispatch();
  useEffect(() => {
  dispatch(fetchAllStudents());
  }, [dispatch]);

  if(loading){
    return <p className="student-list__loading">Loading students...</p>
  }

  if(studentFromRedux.length === 0 ){
    return (
      <p className="student-list__empty">
          No student found in the list 
      </p>
    )
  }
  return (
    <div className="student-list">
      {studentFromRedux.map(student => (
        <Student
          key={student._id}
          student={student}
          onDelete={(id) => dispatch(deleteStudent(id))}
        />
      ))}
    </div>
  )
}

export default StudentList
