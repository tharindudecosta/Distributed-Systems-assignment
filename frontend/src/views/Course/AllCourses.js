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
        <div className="text-white text-lg font-bold">
          <h2>All Courses</h2>
        </div>
        <div className="courses">
          <input
            type="text"
            className="inputBar" // Apply CSS class
            style={{ width: "500px" }}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          {courses &&
            courses
              .filter((course) => {
                if (
                  course.name.toLowerCase().includes(search.toLowerCase()) ||
                  course.status.toLowerCase().includes(search.toLowerCase()) ||
                  course.instructor.toLowerCase().includes(search.toLowerCase()) ||
                  course.description.toLowerCase().includes(search.toLowerCase())
                ) {
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
