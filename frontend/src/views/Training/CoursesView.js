import { useState, useContext } from 'react'
import {useCoursesContext} from "../../hooks/useCoursesContext"
import axios from "axios"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import AuthContext from "../../context/AuthContext";

import SoloAlert from 'soloalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoursesView = ({ course }) => {
  const {dispatch} = useCoursesContext()
  const [showInput, setShowInput] = useState(false)
  const [enrollmentKey, setEnrollmentKey] = useState('')

  const { user } = useContext(AuthContext);
  const employeeId = user?.employeeId;
  console.log(employeeId);
  
  const courseName = course.name;
  const courseId = course.courseCode;
  const courseDuration = course.duration;
  const courseDescription = course.description;
  const courseFile = course.file

  const handleEnrollClick = async() => {

    setShowInput(true)
  }

  const handleEnrollmentKeySubmit = async (e) => {


    let courseId = e.target.value

    e.preventDefault()

    const enrolled = {
      employeeId: employeeId,
      courseCode: courseId,
    };

    console.log("before Response")

    try {
      let response = await axios.post('http://localhost:4000/api/myCourses/enrollCourse', enrolled)

      if(response.status === 200) {
        SoloAlert.alert({
          title:"Enrollment Success",
          body: "You have successfully enrolled your course",
          icon: "success"
        });
      }

    } catch (error) {
      if(error.response.data.error){
        SoloAlert.alert({
          title:"Enrollment Error",
          body: error.response.data.error,
          icon: "error"
        });
      }
      console.log("Response", error)
    }

    const isValidEnrollmentKey = enrollmentKey === course.courseCode

    if (isValidEnrollmentKey) {
      // window.location.href = `/LectureContent/${course._id}`
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000); // 30 seconds
      
    } else {
        SoloAlert.alert({
            title:"Invaild Emrolment Key",
            body:"try again,",
            icon: "error"
          });
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEnrollmentKeySubmit(e)
    }
  }

  return (
    <div className="course-details">
      <table className="course-info">
        <tr>
          <td>
            <img
              src={`http://localhost:4000/${course.file}`}
              alt="Course Image"
              style={{ height: 200 }}
            />
          </td>
          <td>
            <p className="side">
              <strong>Name : </strong>
              {course.name}
            </p>
            <p className="side">
              <strong>Course code : </strong>
              {course.courseCode}
            </p>
            <p className="side">
              <strong>Duration (hrs): </strong>
              {course.duration}
            </p>
            <p className="description">
              <strong>Description : </strong>
              {course.description}
            </p>
            <br />
          </td>
        </tr>
      </table>
      <p>{formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</p>
      {showInput ? (
        <form
          onSubmit={handleEnrollmentKeySubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <input
            type="text"
            placeholder="Enter enrollment key"
            value={enrollmentKey}
            onChange={(e) => setEnrollmentKey(e.target.value)}
            style={{ width: '150px', marginRight: '10px' }}
            onKeyPress={handleKeyPress}
          />
        </form>
      ) : (
        <button className="TrainingUpdate" onClick={()=>handleEnrollClick(course)}>
          Enroll
        </button>
      )}
    </div>
  )
}

export default CoursesView
