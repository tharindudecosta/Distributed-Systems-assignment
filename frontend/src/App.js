import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'

import Login from './views/Login/Login'
import RegisterStudent from './views/Login/RegisterStudent'

//import Training
import TrainingPanel from './views/Training/pages/TrainingPanel'
import AllCourses from './views/Training/pages/AllCourses'
import Lectures from './views/Training/pages/Lectures'
import LectureView from './views/Training/pages/LectureView'
import UpdateCourse from './views/Training/CourseUpdate'
import AllCoursesPanel from './views/Training/pages/AllCoursesPanel'
import MyCourses from './views/Training/pages/Mycourses'
import AssignCourses from './views/Training/pages/AssignCourses'
import CourseForm from './views/Training/CourseForm'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<RegisterStudent />} />

            {/* Training Route */}
            <Route path='/AllCourses' element={<AllCourses />} />
            <Route path='/trainingpanel' element={<TrainingPanel />} />
            <Route path='/CourseUpdate/:id' element={<UpdateCourse />} />``
            <Route path='/Lectures/:id' element={<Lectures />} />
            <Route path='/LectureContent/:id' element={<LectureView />} />
            <Route path='/AllCoursesPanel' element={<AllCoursesPanel />} />
            <Route path='/MyCourses/:employeeId' element={<MyCourses />} />
            <Route path='/AssignCourses' element={<AssignCourses />} />
            <Route path='/CourseForm' element={<CourseForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;