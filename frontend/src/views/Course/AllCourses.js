import { useEffect, useState } from "react";
import CoursesView from "./CourseViewSingle";
import axios from "axios";

const AllCourses = () => {
  const [courses,setCourses] = useState()
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      // const response = await fetch("/api/courses");
      // const json = await response.json();

      try {
        const response = await axios.get("http://localhost:4000/api/courseService/courses");
        console.log(response);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
                } else if (search === "" ) {
                  return course;
                } 
              })
              .map((course) => (
                <CoursesView key={course._id} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;