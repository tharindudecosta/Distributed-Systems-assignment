import "react-toastify/dist/ReactToastify.css";
import { Image } from "cloudinary-react";
import { useState, useEffect } from "react";
import axios from "axios";

const CourseViewStuSingle = ({ course }) => {
  const [instructorName, setInstructorName] = useState();

  useEffect(() => {
    const fetchCourses = async () => {
      const insId = course.instructor;
      try {
        const response = await axios.get(
          `http://localhost:4000/api/userSevice/users/getProfile/${insId}`
        );
        setInstructorName(response.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-details">
      <a href={"/courseContentAll/" + course._id}>
        <div className="course-info flex-1 bg-white rounded overflow-hidden shadow hover:bg-gray-300">
          <div className="course-image">
            <Image cloudName="dsj8tuguz" publicId={course.file.url} />
          </div>
          <div className="course-description">
            <div className="w-full font-bold text-xl text-gray-800 px-6 p-8 pb-4">
              <h2>{course.name}</h2>
            </div>
            <p>
              <strong>Course ID:</strong> {course._id}
            </p>
            <p>
              <strong>Instructor:</strong> {instructorName}
            </p>
            <p>
              <strong>Status:</strong> {course.status}
            </p>
            <p>
              <strong>Description:</strong> {course.description}
            </p>
            <div className="course-actions">
              <a href={"/courseContentAll/" + course._id}>
                <button className="update-button">View</button>
              </a>
            </div>
          </div>
        </div>
      </a>

    </div>
  );
};

export default CourseViewStuSingle;
