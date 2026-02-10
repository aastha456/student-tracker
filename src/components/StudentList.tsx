import type { Student } from './types'
import StudentItem from './StudentItem'

//props for student list
interface StudentItemProps {
    students: Student[];
    onDelete: (id: string) => void;
}

const StudentList = ({students, onDelete}: StudentItemProps) => {

  return (
    <div className="student-list">
        <h2>Student List</h2>
        {students.map((student)=> (
            <StudentItem key={student.id} student={student} onDelete={onDelete}/>
        ))}
      
    </div>
  )
}

export default StudentList
