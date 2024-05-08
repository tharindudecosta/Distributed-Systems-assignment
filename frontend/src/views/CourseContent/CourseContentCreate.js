import axios from "axios";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import "./CourseContentCreate.css"; // Import CSS file for styling

const CourseContentCreate = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setVideo(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !video) {
      setEmptyFields(["title", "description", "video"]);
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", video);
      formData.append("upload_preset", "v3cvsxfw"); // Replace with your Cloudinary upload preset

      const videoResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dsj8tuguz/video/upload",
        formData
      );

      if (videoResponse.status === 200) {
        const videoInfo = {
          public_id: videoResponse.data.asset_id,
          url: videoResponse.data.secure_url,
        };
        
        const content = {
          title: name,
          description: description,
          courseId: id,
          file: videoInfo,
        };

        const response = await axios.post(
          `http://localhost:4000/api/courseContentService/courseContents/createContent`,
          content
        );

        if (response.status === 200) {
          console.log(response);
          // Clear form fields after successful submission
          setName("");
          setDescription("");
          setVideo(null);
          setError(null);
          setEmptyFields([]);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error occurred while uploading video.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="page-container mt-20">
      <h2>Add new Course Content</h2>
      <div className="form-container">
        <form className="create-form" onSubmit={handleSubmit}>
          <h3>Create a New Course</h3>
          <div className="form-group">
            <label className="form-label">Course Name :</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={emptyFields.includes("title") ? "form-input error" : "form-input"}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description :</label>
            <textarea
              name="description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className={emptyFields.includes("description") ? "form-input error" : "form-input"}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Select Video :</label>
            <input
              type="file"
              accept="video/*, audio/*"
              onChange={handleFileChange}
              className={emptyFields.includes("video") ? "form-input error" : "form-input"}
            />
          </div>
          {/* Render loading icon if uploading */}
          <button type="submit" className="form-button">
            Create
          </button>
          {isUploading && <CircularProgress />}{" "}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default CourseContentCreate;
