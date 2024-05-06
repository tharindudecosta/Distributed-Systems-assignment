import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Image } from "cloudinary-react";
import { useParams } from "react-router-dom";

const CoursePurchase = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [fileUrl, setFileUrl] = useState(null);

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const studentId = user._id;

    const Payment = {
      studentId: studentId,
      courseId: id,
      amount: price,
      status: "Completed",
    };

    const enrollment = {
      studentId: studentId,
      courseId: id,
    };
    console.log(enrollment);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/enrollmentService/enrollments/enroll",
        enrollment
      );
      console.log(response);
      if (response.status == 200) {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/paymentService/payments/newPayment",
            Payment
          );
          if (response.status == 200) {
            window.alert("Payment complted")
            console.log(response);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/courseService/courses/${id}`
        );
        setName(response.data.name);
        setDescription(response.data.description);
        setInstructor(response.data.instructor);
        setPrice(response.data.price);
        setFileUrl(response.data.file.url);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourseInfo();
  }, []);

  return (
    <div>
      <Image style={{ width: 250 }} cloudName="dsj8tuguz" publicId={fileUrl} />
      <p className="side">
        <strong>Name : </strong>
        {name}
      </p>
      <p className="side">
        <strong>Instructor : </strong>
        {instructor}
      </p>
      <p className="side">
        <strong>Price (Rs.): </strong>
        {price}
      </p>
      <p className="side">
        <strong>status : </strong>
        {status}
      </p>
      <p className="description">
        <strong>Description : </strong>
        {description}
      </p>
      <br />
      <form className="create" onSubmit={handleSubmit}>
        <h3>Purchase a New Course</h3>
        <br />

        <lable>Card number</lable>
        <input type="text" />
        <lable>CVV number</lable>
        <input type="text" />

        <button>Confirm</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default CoursePurchase;
