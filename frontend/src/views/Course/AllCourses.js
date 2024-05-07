import { useEffect, useState } from "react";
import CoursesView from "./CourseViewSingle";
import axios from "axios";
import "./AllCourses.css"; // Import CSS file

const AllCourses = () => {
  const [courses, setCourses] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/courseService/courses"
        );
        console.log(response);
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
            className="inputBar" // Apply CSS class
            placeholder="Search By ID or Name"
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
                <CoursesView key={course._id} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
