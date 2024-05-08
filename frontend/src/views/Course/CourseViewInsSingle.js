import { Image } from "cloudinary-react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CourseViewSingle.css";

const CourseViewInsSingle = ({ course }) => {
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
      <div className="course-info">
        <div className="course-image">
          <Image
            cloudName="dsj8tuguz"
            publicId={course.file.url}
            className="course-image"
          />
        </div>
        <div className="course-description">
          <h2>{course.name}</h2>
          <p>
            <strong>Instructor :</strong> {instructorName}
          </p>
          <p>
            <strong>Price (Rs.):</strong> {course.price}
          </p>
          <p>
            <strong>Status :</strong> {course.status}
          </p>
          <p>
            <strong>Description :</strong> {course.description}
          </p>

          <div className="course-actions">
            <a href={"/courseContentAll/" + course._id}>
              <button className="update-button">View</button>
            </a>
            <a href={"/courseContentForm/" + course._id}>
              <button className="buy-button">Add Content</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewInsSingle;
