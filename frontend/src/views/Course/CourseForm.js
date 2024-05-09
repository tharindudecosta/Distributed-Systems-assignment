import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Form.css"; // Import CSS file for styling

const CourseForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileId, setFileId] = useState(null);

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !file) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "v3cvsxfw");

    try {
      const cloudResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dsj8tuguz/upload",
        formData
      );

      if (cloudResponse.status === 200) {
        setFileId(cloudResponse.data.asset_id);
        setFileUrl(cloudResponse.data.secure_url);

        try {
          const user = JSON.parse(localStorage.getItem("user"));
          const insId = user._id;

          const imageInfo = {
            public_id: cloudResponse.data.asset_id,
            url: cloudResponse.data.secure_url,
          };

          const newCourse = {
            name: name,
            description: description,
            instructorId: insId,
            price: price,
            file: imageInfo,
          };

          const response = await axios.post(
            "http://localhost:4000/api/courseService/courses/newCourse",
            newCourse
          );

          if (response.status === 201) {
            navigate("/allcourses");
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-container mt-10">
      <form className="form-container" onSubmit={handleSubmit}>
        <h3 className="mb-7">Create a New Course</h3>
        <div className="form-group">
          <label>Course Name :</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Price :</label>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div className="form-group">
          <label>Description :</label>
          <textarea
            name="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="form-group">
          <label>Thumbnail :</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            name="filename"
          />
          {file && (
            <video
              src={URL.createObjectURL(file)}
              width="320"
              height="240"
              controls
            />
          )}
        </div>
        <div className="form-group">
          <button className="form-button" type="submit">
            Create Course
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default CourseForm;
