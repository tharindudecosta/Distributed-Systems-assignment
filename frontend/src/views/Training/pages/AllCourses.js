import { useEffect, useState } from "react";
import { useCoursesContext } from "../../../hooks/useCoursesContext";
import TrainingNavbar from "../../../components/trainingNavbar";
import CoursesView from "../CoursesView";

const View = () => {
  const { courses, dispatch } = useCoursesContext();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_COURSES", payload: json });
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <TrainingNavbar />

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
                if (
                  search === "" ||
                  course.name.toLowerCase().includes(search.toLowerCase()) ||
                  course.courseCode.toLowerCase().includes(search.toLowerCase())
                ) {
                  return course;
                }
              })
              .map((course) => (
                <CoursesView key={course.id} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default View;
