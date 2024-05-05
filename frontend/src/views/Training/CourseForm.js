import { useState } from "react";
import { useCoursesContext } from "../../hooks/useCoursesContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseForm = () => {
  const { dispatch } = useCoursesContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [instructorId, setInstructorId] = useState("");
  const [price, setPrice] = useState("");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const course = {name, description, file,instructorId,price}
    // console.log(course);
    // let data = new FormData();
    // data.append('name', course.name);
    // data.append('instructorId', course.instructorId);
    // data.append('price', course.price);
    // data.append('description', course.description);
    // data.append('file', course.file)

    // let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: 'http://localhost:4000/api/courseService/courses/newCourse',
    //     data : data
    //   };

    // axios.request(config)
    // .then((response) => {
    //     console.log(response);
    //     response.statusCode = 200;
    //     window.location.reload(); // reload the page on successful submission
    // })
    // .catch((error) => {
    //     console.log(error);
    //     toast(error)
    // });

    const formdata = new FormData();
    formdata.append("file", file);
    axios
      .post("/api/courseService/upload", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response); // reload the page on successful submission
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Create a New Course</h3>
        <br />

        {/* <lable>Course Name :</lable>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <lable>Course Instructor :</lable>
        <input
          type="text"
          onChange={(e) => setInstructorId(e.target.value)}
          value={instructorId}
          className={emptyFields.includes("instructorId") ? "error" : ""}
        />

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
        /> */}
        <label>Thumbnail : </label>
        <input
          type="file"
          id="myfile"
          onChange={(e) => setFile(e.target.files[0])}
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
