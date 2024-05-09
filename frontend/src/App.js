import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./common/Auth";

// pages & components
import Home from "./pages/Home";

import Login from "./views/Login/Login";
import RegisterStudent from "./views/Login/RegisterStudent";
import RegisterUser from "./views/Login/RegisterUser";
//import Training
import CourseForm from "./views/Course/CourseForm";
import AllCourses from "./views/Course/AllCourses";
import AllCoursesIns from "./views/Course/AllCoursesIns";
import CoursePurchase from "./views/Course/CoursePurchase";
import AllCoursesStu from "./views/Course/AllCoursesStu";
import CourseUpdateForm from "./views/Course/CourseUpdateForm";
import CourseContentCreate from "./views/CourseContent/CourseContentCreate";
import CourseContentAll from "./views/CourseContent/CourseContentAll";

import AllPayments from "./views/Management/AllPayments";
import AllEnrollments from "./views/Management/AllEnrollments";

import Navbar from "./components/Navbar";
import Background from "./components/Background";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Background/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                <Auth>
                  {" "}
                  <Home />{" "}
                </Auth>
              }
            />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<RegisterStudent />} />
            <Route path="/RegisterUser" element={<RegisterUser />} />

            {/* Training Route */}
            <Route
              path="/CourseForm"
              element={
                <Auth>
                  {" "}
                  <CourseForm />{" "}
                </Auth>
              }
            />
            <Route
              path="/allcourses"
              element={
                <Auth>
                  <AllCourses />
                </Auth>
              }
            />
            <Route
              path="/inscourse"
              element={
                <Auth>
                  <AllCoursesIns />
                </Auth>
              }
            />
            <Route
              path="/stucourse"
              element={
                <Auth>
                  <AllCoursesStu />
                </Auth>
              }
            />
            <Route
              path="/coursePurchase/:id"
              element={
                <Auth>
                  <CoursePurchase />
                </Auth>
              }
            />
            <Route
              path="/CourseUpdate/:id"
              element={
                <Auth>
                  <CourseUpdateForm />
                </Auth>
              }
            />
            <Route
              path="/courseContentForm/:id"
              element={
                <Auth>
                  <CourseContentCreate />
                </Auth>
              }
            />
            <Route
              path="/courseContentAll/:id"
              element={
                <Auth>
                  <CourseContentAll />
                </Auth>
              }
            />

            <Route
              path="/allPayments"
              element={
                <Auth>
                  <AllPayments />
                </Auth>
              }
            />
            <Route
              path="/allEnrollments"
              element={
                <Auth>
                  <AllEnrollments />
                </Auth>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
