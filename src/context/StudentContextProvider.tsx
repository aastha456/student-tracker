import { useContext, createContext, useEffect, useState } from "react";
import type { Student } from "../components/types";
/** 
 * Define the shape of the context
 * This tells TypeScript what data and functions
 * our context will provide globally.
*/

interface StudentContextType {
  students: Student[];// all student list
  addStudent: (student: Omit<Student, "id">) => void;// when adding new studnet we dont need new id 
  deleteStudent: (id: string) => void;// delete student without id
  updateStudent: (student: Student) => void;// update existing student 
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;// direct state setter
}

/**
* Create the context 
* Initially undefined (before the Provider wraps the app)
* 
*/
const StudentContext = createContext<StudentContextType | undefined>(undefined);

/**
* Custom hook to safely use the context
*/
export const useStudentContext = () => {
  const context = useContext(StudentContext);
   // If used outside provider, throw error
  if (!context) {
    throw new Error("useStudentContext must be within StudentContextProvider");
  }
  return context;
};

/**
 * Provider component
 * This component holds the actual state and logic.
 */
export const StudentContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   /**
   * Initialize students state
   * Load from localStorage only on first render
   */
  const [students, setStudents] = useState<Student[]>(() => {
    const stored = localStorage.getItem("students");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        localStorage.setItem("students", JSON.stringify([]));
        return [];
      }
    }
    return [];
  });

  /**
   * Sync students to localStorage whenever it changes
   */
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);
   /**
   * Add new student
   * Automatically generate unique id
   */
  const addStudent = (student: Omit<Student, "id">) => {
    setStudents(prev => [
      ...prev,
      { ...student, id: crypto.randomUUID() }
    ]);
  };
  /**
   * Delete student by id
   */
  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };
   /**
   * Update student details
   */
  const updateStudent = (updated: Student) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === updated.id ? updated : student
      )
    );
  };
  /**
   * Provide state + functions to entire app
   */
  return (
    <StudentContext.Provider
      value={{ students, setStudents, addStudent, deleteStudent, updateStudent }}
    >
    {children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
