import { useEffect, useState } from "react";
import CourseViewStuSingle from "./CourseViewStuSingle";
import axios from "axios";

const AllCoursesStu = () => {
  const [courses,setCourses] = useState()
  const [enrollment,setEnrollments] = useState()
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const studentId = user._id;
      let enrollmentArray = []

      try {
        const response = await axios.get(`http://localhost:4000/api/enrollmentService/enrollments/student/${studentId}`);
        // setCourses(response.data);
        if(response.status==200){
          try {
            for(let i = 0 ; i < response.data.length;i++){
              const courseResponse = await axios.get(
                `http://localhost:4000/api/courseService/courses/${response.data[i].courseId}`
              );
              enrollmentArray.push(courseResponse.data)
            }
            setCourses(enrollmentArray)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>

      <div className="homeView">
      <div className="text-white text-lg font-bold">
          <h2>Student Course Dashboard</h2>
        </div>
        <div className="courses">
          <input
            type="text"
            style={{ width: "500px" }}
            placeholder="Search By ID or Name"
            className="inputBar"
            onChange={(e) => setSearch(e.target.value)}
          />
          {courses &&
            courses
              .filter((course) => {
                if (course.name.toLowerCase().includes(search.toLowerCase())) {
                  return course;
                } else if (search === "" ) {
                  return course;
                } 
              })
              .map((course) => (
                <CourseViewStuSingle key={course._id} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default AllCoursesStu;
