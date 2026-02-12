import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import StudentList from "./pages/StudentList";
import StudentForm from "./pages/StudentForm";
import "./App.css";
import "./reset.css";

function App() {
  return (
    <BrowserRouter> 
      <div className="app-container">
        <Header
          title="Student Tracker"
          description="This is a simple student tracker"
          logo="https://www.skoolbeep.com/student-tracking-system/assets/img/icon/featured-img/student-traking.png"
        />

        <Routes>
          <Route index element={<StudentList />} />
          <Route path="/list" element={<StudentList />} />
          <Route path="/add" element={<StudentForm />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
