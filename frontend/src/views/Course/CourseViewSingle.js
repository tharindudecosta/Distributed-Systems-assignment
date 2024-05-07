import "react-toastify/dist/ReactToastify.css";
import { Image } from "cloudinary-react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CourseViewSingle.css"; // Import CSS file for styling

const CoursesView = ({ course }) => {
  const [instructorName, setInstructorName] = useState();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        const deletedCourse = {
          name: course.name,
          description: course.description,
          instructor: course.instructor,
          price: course.price,
          file: course.file,
          status: "Inactive",
        };
        console.log(course._id);
        const response = await axios.put(
          `http://localhost:4000/api/courseService/courses/update/${course._id}`,
          deletedCourse
        );
        if (response.status === 200) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            <strong>Course ID:</strong> {course._id}
          </p>
          <p>
            <strong>Instructor:</strong> {instructorName}
          </p>
          <p>
            <strong>Price (Rs.):</strong> {course.price}
          </p>
          <p>
            <strong>Status:</strong> {course.status}
          </p>
          <p>
            <strong>Description:</strong> {course.description}
          </p>
          <div className="course-actions">
            <a href={"/coursePurchase/" + course._id}>
              <button className="buy-button">Buy now</button>
            </a>
            <button className="delete-button" onClick={handleClick}>
              Delete
            </button>
            <a href={"/CourseUpdate/" + course._id}>
              <button className="update-button">Update</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesView;
