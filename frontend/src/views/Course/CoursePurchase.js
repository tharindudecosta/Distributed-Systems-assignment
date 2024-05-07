import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Image } from "cloudinary-react";
import { useParams } from "react-router-dom";
import "./CoursePurchase.css"; // Import CSS file for styling

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

    try {
      const response = await axios.post(
        "http://localhost:4000/api/enrollmentService/enrollments/enroll",
        enrollment
      );
      if (response.status === 200) {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/paymentService/payments/newPayment",
            Payment
          );
          if (response.status === 200) {
            toast.success("Payment completed");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
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
    <div className="course-purchase-container">
      <div className="course-details">
        <Image
          style={{ width: 250 }}
          cloudName="dsj8tuguz"
          publicId={fileUrl}
        />
        <div className="details">
          <h2>
            <strong></strong> {name}
          </h2>
          <p>
            <strong>Instructor:</strong> {instructor}
          </p>
          <p>
            <strong>Price (Rs.):</strong> {price}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p className="description">
            <strong>Description:</strong> {description}
          </p>
        </div>
      </div>
      <form className="purchase-form" onSubmit={handleSubmit}>
        <h3>Purchase a New Course</h3>
        <br></br>
        <div className="form-group">
          <label>Card Number: </label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label> Name : </label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>CVV Number : </label>
          <input type="text" />
        </div>
        <button className="confirm-button">Confirm</button>
        {error && <div className="error">{error}</div>}
      </form>
      <ToastContainer />
    </div>
  );
};

export default CoursePurchase;
