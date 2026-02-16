import { useStudentContext }from "../context/StudentContextProvider";
import Student from "../components/Student";
import "./StudentList.css"

const StudentList = () => {
  const { students, deleteStudent} = useStudentContext();
  if(students.length === 0 ){
    return (
      <p className="student-list__empty">
          No student found in the list 
      </p>
    )
  }
  return (
    <div className="student-list">
      {students.map ( student => (
        <Student key={student.id} student={student} onDelete={deleteStudent}/>
      ))}
    </div>
  )
}

export default StudentList
