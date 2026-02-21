import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import StudentList from "./pages/StudentList";
import StudentFormPage from "./pages/StudentFormPage";
// import StudentForm from "./components/StudentForm"
import "./App.css";

import StudentDetailView from "./pages/StudentDetailView"
import StudentEdit from "./pages/StudentEdit"
import StudentDetailLayout from "./pages/StudentDetailLayout";

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
          <Route path="list" element={<StudentList />} />
          <Route path="/add" element={<StudentFormPage />} /> 

          <Route path="/student/:id" element={<StudentDetailLayout/>}>
          <Route index element = {<StudentDetailView/>}></Route>
          <Route path="edit" element={<StudentEdit/>}></Route>
        </Route>
        </Routes>      
      </div>
    </BrowserRouter>
  );
}

export default App;
