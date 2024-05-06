import { useEffect, useState } from "react";
import CourseViewInsSingle from "./CourseViewInsSingle";
import axios from "axios";

const AllCoursesIns = () => {
  const [courses, setCourses] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const user =  JSON.parse(localStorage.getItem("user"));
      const insId = user._id

      try {
        const response = await axios.get(
          `http://localhost:4000/api/courseService/courses/instructor/${insId}`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };

    fetchCourses();
  }, []);

  return (
    <div>
      <div className="homeView">
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
                } else if (search === "") {
                  return course;
                }
              })
              .map((course) => (
                <CourseViewInsSingle key={course._id} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default AllCoursesIns;
