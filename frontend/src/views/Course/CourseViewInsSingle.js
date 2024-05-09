import { Image } from "cloudinary-react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CourseViewSingle.css";

const CourseViewInsSingle = ({ course }) => {
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
      <a href={"/courseContentAll/" + course._id}>
        <div className="course-info flex-1 bg-white rounded overflow-hidden shadow hover:bg-gray-300 ">
          <div className="course-image">
            <Image
              cloudName="dsj8tuguz"
              publicId={course.file.url}
              className="course-image"
            />
          </div>
          <div className="course-description">
            <div className="w-full font-bold text-xl text-gray-800 px-6 p-8 pb-4">
              <h2>{course.name}</h2>
            </div>
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
                <button className="delete-button" onClick={handleClick}>
                  Delete
                </button>
              </a>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CourseViewInsSingle;
