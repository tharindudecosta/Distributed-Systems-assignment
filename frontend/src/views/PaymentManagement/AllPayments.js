import React, { useEffect, useState } from "react";
import PaymentSingle from "./PaymentSingle";
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const AllPayments = () => {
  const [payments, setPayments] = useState();
  const [paymentResponse, setPaymentResponse] = useState();
  const [search, setSearch] = useState("");
  const [instructorName, setInstructorName] = useState();

  const tempArray = [];

  const createPDF = (paymentResponse) => {
    const documentDefinition = {
      content: [
        { text: "Employee Attendance Records", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
            body: [
              [
                { text: "Payment Id", style: "tableHeader" },
                { text: "Course", style: "tableHeader" },
                { text: "Student", style: "tableHeader" },
                { text: "Amount", style: "tableHeader" },
                { text: "Status", style: "tableHeader" },
                { text: "Date", style: "tableHeader" },
              ],
              ...paymentResponse
                .filter((payment) => {
                  if (search === "") {
                    return payment;
                  } else if (
                    payment._id.toLowerCase().includes(search.toLowerCase()) ||
                    payment.student
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    payment.course.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return payment;
                  }
                })
                .map((payment) => [
                  { text: payment._id, style: "tableCell" },
                  { text: payment.course, style: "tableCell" },
                  { text: payment.student, style: "tableCell" },
                  { text: payment.amount, style: "tableCell" },
                  { text: payment.status, style: "tableCell" },
                  { text: payment.createdAt, style: "tableCell" },
                ]),
            ],
          },
        },
      ],
      pageSize: "A3",
      pageSize: {
        width: 1500,
        height: 800,
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download("Payment_Data.pdf");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/paymentService/payments"
        );
        console.log(response);

        if (response.status == 200) {
          try {
            for (let index = 0; index < response.data.length; index++) {
              const student = response.data[index].student;
              const studentResponse = await axios.get(
                `http://localhost:4000/api/userSevice/users/getProfile/${student}`
              );
              const course = response.data[index].course;
              const courseResponse = await axios.get(
                `http://localhost:4000/api/courseService/courses/${course}`
              );

              response.data[index].student = studentResponse.data.name;
              response.data[index].course = courseResponse.data.name;
            }
          } catch (error) {
            console.error("Error:", error);
          }
          setPaymentResponse(response.data);
          console.log(paymentResponse.length);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <input
        type="text"
        style={{ width: "500px" }}
        placeholder="Search By ID or Name"
        className="inputBar"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={() => createPDF(paymentResponse)}
        title="Download PDF"
        className="pdfBtn"
      >
        Download
      </button>
      <table id="attTbl">
        <thead>
          <tr>
            <th>payment Id</th>
            <th>Course</th>
            <th>student</th>
            <th>Amount</th>
            <th>status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {paymentResponse &&
            paymentResponse
              .filter((payment) => {
                if (search === "") {
                  return payment;
                } else if (
                  payment._id.toLowerCase().includes(search.toLowerCase()) ||
                  payment.student
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  payment.course.toLowerCase().includes(search.toLowerCase())
                ) {
                  return payment;
                }
              })
              .map((payment) => (
                <PaymentSingle key={payment._id} payment={payment} />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPayments;
