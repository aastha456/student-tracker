import Header from './components/Header'
import './App.css'
import './reset.css'
import StudentTracker from './components/StudentTracker'

function App() {

  return (
    <div className="app-container">
      <Header title="Student Tracker" description="This is a simple student tracker" logo="https://www.skoolbeep.com/student-tracking-system/assets/img/icon/featured-img/student-traking.png"/>
      <StudentTracker/>  
    </div>
  )
}

export default App
