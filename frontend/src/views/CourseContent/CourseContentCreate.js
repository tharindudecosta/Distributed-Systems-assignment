import axios from "axios";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

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

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video) {
      alert("Please select a video file");
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
      
      if (videoResponse.status == 200) {
        try {
          const videoInfo = {
            public_id: videoResponse.data.asset_id,
            url: videoResponse.data.secure_url,
          };
          // const videoInfo = {
          //   public_id: "eqfa0nrbpmy6lkwpxt7v",
          //   url: "https://res.cloudinary.com/dsj8tuguz/video/upload/v1715074361/eqfa0nrbpmy6lkwpxt7v.mp4",
          // };
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

          if (response.status == 200) {
            console.log(response);
          }
        } catch (error) {
          console.error("Error creation:", error);
        }
      }

      // console.log("Uploaded video URL:", videoResponse);
      // Handle the uploaded video URL as needed (e.g., save to database, display in UI)
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div>
        <h2>Add new Course Content </h2>

        <form className="create" onSubmit={handleUpload}>
          <h3>Create a New Course</h3>
          <br />
          <lable>Course Name :</lable>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes("title") ? "error" : ""}
          />
          <lable>Description :</lable>
          <textarea
            name="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes("description") ? "error" : ""}
            style={{ width: "379px", height: "100px", marginBottom: "10px" }}
          />
          <input
            type="file"
            accept="video/*, audio/*"
            onChange={handleFileChange}
          />
          {/* Render loading icon if uploading */}
          <button className="TrainingButton">Create</button>
          {isUploading && <CircularProgress />}{" "}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default CourseContentCreate;
