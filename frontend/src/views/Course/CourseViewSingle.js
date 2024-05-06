import "react-toastify/dist/ReactToastify.css";
import { Image } from "cloudinary-react";
import { useState, useEffect } from "react";
import axios from "axios";

const CoursesView = ({ course }) => {
  const [instructorName, setInstructorName] = useState();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm("Are You sure you want to delete record?")) {
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
        if (response.status == 200) {
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
      <table className="course-info">
        <tr>
          <td>
            <Image
              style={{ width: 250 }}
              cloudName="dsj8tuguz"
              publicId={course.file.url}
            />
          </td>
          <td>
            <p className="side">
              <strong>Name : </strong>
              {course.name}
            </p>
            <p className="side">
              <strong>Instructor : </strong>
              {instructorName}
            </p>
            <p className="side">
              <strong>Price (Rs.): </strong>
              {course.price}
            </p>
            <p className="side">
              <strong>status : </strong>
              {course.status}
            </p>
            <p className="description">
              <strong>Description : </strong>
              {course.description}
            </p>
            <br />
          </td>
          <td>
            <a href={"/coursePurchase/" + course._id}>
              <button>Buy now</button>
            </a>
            <br />
            <button onClick={handleClick}>Delete</button>
            <br />
            <a href={"/CourseUpdate/" + course._id}>
              <button className="blueButton">Update</button>
            </a>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default CoursesView;
