import Header from './components/Header'
import './App.css'
import './reset.css'
import StudentTracker from './components/StudentTracker'

function App() {

  return (
    <div className="app-container">
      <Header title="Student Tracker" description="This is a simple student tracker"/>
      <StudentTracker/>
    </div>
  )
}

export default App
