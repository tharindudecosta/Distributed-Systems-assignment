import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import "./Form.css"; // Import CSS file for styling
import CircularProgress from "@mui/material/CircularProgress";
import swal from "sweetalert2";

const CourseUpdateForm = () => {
  const { id } = useParams();
  const [courseId, setCourseId] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const [file, setFile] = useState(null);
  const [fileOld, setFileOld] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [newUpload, setNewUpload] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsUploading(true);

    if (newUpload) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "v3cvsxfw");

      try {
        const cloudResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dsj8tuguz/upload",
          formData
        );

        if (cloudResponse.status == 200) {
          console.log(cloudResponse);
          setFileId(cloudResponse.data.asset_id);
          setFileUrl(cloudResponse.data.secure_url);

          try {
            const user = JSON.parse(localStorage.getItem("user"));
            const insId = user._id;
            console.log(insId);

            const imageInfo = {
              public_id: cloudResponse.data.asset_id,
              url: cloudResponse.data.secure_url,
            };

            const newCourse = {
              name: name,
              description: description,
              instructor: instructorId,
              price: price,
              file: imageInfo,
              status: status,
            };
            console.log(newCourse);
            const response = await axios.put(
              `http://localhost:4000/api/courseService/courses/update/${courseId}`,
              newCourse
            );

            if (response.status == 200) {
              console.log(response);
              swal.fire({
                title: "Good job!",
                text: "Course Updated Successfully!",
                icon: "success",
              });
            }
          } catch (error) {
            swal.fire({
              title: "Oops!",
              text: "Course Update failed",
              icon: "error",
            });
            console.error(error);
          }
        } else {
          console.log(cloudResponse);
        }
      } catch (error) {
        swal.fire({
          title: "Oops!",
          text: "Image Upload failed",
          icon: "error",
        });
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    } else {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const insId = user._id;

        const newCourse = {
          name: name,
          description: description,
          instructor: instructorId,
          price: price,
          file: fileOld,
          status: status,
        };
        console.log(newCourse);
        const response = await axios.put(
          `http://localhost:4000/api/courseService/courses/update/${courseId}`,
          newCourse
        );

        if (response.status == 200) {
          console.log(response);
          swal.fire({
            title: "Good job!",
            text: "Course updated Successfully!",
            icon: "success",
          });
        }
      } catch (error) {
        swal.fire({
          title: "Oops!",
          text: "Course Update failed",
          icon: "error",
        });
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleImage = async (e) => {
    e.preventDefault();
    setNewUpload(true);
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const studentId = user._id;

      try {
        const response = await axios.get(
          `http://localhost:4000/api/courseService/courses/${id}`
        );

        if (response.status == 200) {
          setCourseId(response.data._id);
          setName(response.data.name);
          setDescription(response.data.description);
          setInstructorId(response.data.instructor);
          setPrice(response.data.price);
          setStatus(response.data.status);
          setFileOld(response.data.file);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="page-container mt-10">
      <form onSubmit={handleSubmit} className="form-container bg-white">
        <h3 className="mb-7">Update Course</h3>
        <div className="form-group">
          <label>Course Name :</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={
              emptyFields.includes("name") ? "form-input error" : "form-input"
            }
          />
        </div>
        <div className="form-group">
          <label>Price :</label>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className={
              emptyFields.includes("price") ? "form-input error" : "form-input"
            }
          />
        </div>
        <div className="form-group">
          <label>Description :</label>
          <textarea
            name="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={
              emptyFields.includes("description")
                ? "form-input error"
                : "form-input"
            }
          />
        </div>
        <div className="form-group">
          <label>Thumbnail :</label>
          <input
            type="file"
            id="myfile"
            onChange={handleImage}
            accept="image/*" //only accept image files
            name="filename"
          />
        </div>
        <button type="submit" className="form-button">
          Update
        </button>
        {isUploading && <CircularProgress />}{" "}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default CourseUpdateForm;
