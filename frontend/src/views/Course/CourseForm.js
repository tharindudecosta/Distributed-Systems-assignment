import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "v3cvsxfw");

    try {
      const cloudResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dsj8tuguz/upload",
        formData
      );

      if (cloudResponse.status === 200) {
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
            instructorId: insId,
            price: price,
            file: imageInfo,
          };
          console.log(newCourse);
          const response = await axios.post(
            "http://localhost:4000/api/courseService/courses/newCourse",
            newCourse
          );

          if (response.status === 201) {
            console.log(response);
            navigate("/allcourses");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log(cloudResponse);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto mt-[40px]">
      <form className="create" onSubmit={handleSubmit}>
        <h3 className="text-[2rem] px-4">Create a New Course</h3>
        <div className="items-center mb-4 pt-[30px] px-4">
          <label className="mr-2 text-[1.5rem]">Course Name :</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-gray-100 w-full py-2 px-4 rounded-md focus:outline-none"
          />
        </div>
        <div className="items-center mb-4 pt-[20px] px-4">
          <lable className="mr-2 text-[1.5rem]">Price :</lable>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            // className={emptyFields.includes("price") ? "error" : ""}
            className="bg-gray-100 w-full py-2 px-4 rounded-md focus:outline-none"
          />
        </div>
        <div className="items-center mb-4 pt-[20px] px-4">
          <lable className="mr-2 text-[1.5rem]">Description :</lable>
          <br />
          <textarea
            name="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            // className={emptyFields.includes("description") ? "error" : ""}
            // style={{ width: "379px", height: "100px", marginBottom: "10px" }}
            className="bg-gray-100 w-full py-2 px-4 rounded-md focus:outline-none h-[100px]"
          />
        </div>
        <div className="items-center mb-4 pt-[20px] px-4">
          <label className="mr-4 text-[1.5rem]">Thumbnail : </label>
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
        </div>
        <div className="items-center mb-4 mt-[30px] px-4">
          <button
            // className="TrainingButton"
            className="bg-blue-500 hover:bg-blue-700 text-[1.2rem] text-white font-bold py-2 px-4 rounded"
          >
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
