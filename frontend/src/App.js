import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'

import Login from './views/Login/Login'
import RegisterStudent from './views/Login/RegisterStudent'
import RegisterUser from './views/Login/RegisterUser'
//import Training
import CourseForm from './views/Course/CourseForm'
import AllCourses from './views/Course/AllCourses'
import AllCoursesIns from './views/Course/AllCoursesIns'
import CoursePurchase from './views/Course/CoursePurchase'
import AllCoursesStu from './views/Course/AllCoursesStu'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<RegisterStudent />} />
            <Route path='/RegisterUser' element={<RegisterUser />} />

            {/* Training Route */}
            <Route path='/CourseForm' element={<CourseForm />} />
            <Route path='/allcourses' element={<AllCourses />} />
            <Route path='/inscourse' element={<AllCoursesIns />} />
            <Route path='/stucourse' element={<AllCoursesStu />} />
            <Route path='/coursePurchase/:id' element={<CoursePurchase />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;