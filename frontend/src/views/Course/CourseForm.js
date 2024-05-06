import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

          const user =  JSON.parse(localStorage.getItem("user"));
          const insId = user._id
          console.log(insId);
          
          const imageInfo = {
            public_id:cloudResponse.data.asset_id,
            url:cloudResponse.data.secure_url
          }
    
          const newCourse = {
            name: name,
            description: description,
            instructorId: insId,
            price: price,
            file: imageInfo
          };
          console.log(newCourse);
          const response = axios.post("http://localhost:4000/api/courseService/courses/newCourse", newCourse)
          
          if (response.status == 200){
            console.log(response)
          }
            
        } catch (error) {
          console.error(error);
          throw new error("Course error");
        }

      } else{
        console.log(cloudResponse);
      }
    } catch (error) {
      console.error(error);
      throw new error("Cloud error");
    }


  };

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Create a New Course</h3>
        <br />

        <lable>Course Name :</lable>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        {/* <lable>Course Instructor :</lable>
        <input
          type="text"
          onChange={(e) => setInstructorId(e.target.value)}
          value={instructorId}
          className={emptyFields.includes("instructorId") ? "error" : ""}
        /> */}

        <lable>Price :</lable>
        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className={emptyFields.includes("price") ? "error" : ""}
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
        <label>Thumbnail : </label>
        <input
          type="file"
          id="myfile"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          className={emptyFields.includes("file") ? "error" : ""}
          accept="image/*" //only accept image files
          name="filename"
        />

        <button className="TrainingButton">Create</button>
        {error && <div className="error">{error}</div>}
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
