import { useState, useContext, useEffect } from 'react'
import {useCoursesContext} from "../../../hooks/useCoursesContext"
import axios from "axios"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import CourseContentViewEmployee from "../CourseContentViewEmployee"
import TrainingNavbar from "../../../components/trainingNavbar";
import { useParams } from "react-router-dom";

function Mycourses() {
  const { courses, dispatch } = useCoursesContext();
  const [search, setSearch] = useState("");
  const {employeeId} = useParams();

  console.log(employeeId)


  useEffect(() => {
    console.log("fetchCourses")
    const fetchCourses = async () => {
      const response = await fetch(`/api/myCourses/${employeeId}`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_COURSES", payload: json });
      }
    };

    fetchCourses();
  }, []);

  const getAllCoursesCount = (courses) => {
    if (!courses) {
      return 0;
    }
    return courses.length;
  };

  const totalCoursesCount = getAllCoursesCount(courses);

  return (
    <div>
      <TrainingNavbar />

      <div className="homeView">
                <div className="courses">
                {/* <div className="courseCount">
                    <center><p className="totalCount">Total Courses {totalCoursesCount}</p></center>
                </div> */}
                    {courses &&
                    courses
                        .filter(course => {
                        if (
                            search === "" ||
                            course.name.toLowerCase().includes(search.toLowerCase()) ||
                            course.courseCode.toLowerCase().includes(search.toLowerCase())
                        ) {
                            return course;
                        }
                        })
                        .map(course => (
                        <CourseContentViewEmployee key={course.id} course={course} />
                        ))}
                </div>
            </div>
    </div>
  )
}

export default Mycourses
