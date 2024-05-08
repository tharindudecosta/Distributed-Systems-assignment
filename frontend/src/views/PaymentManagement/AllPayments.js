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
    <div className="cont123">
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
      <table className="min-w-full bg-slate-200">
        <thead>
          <tr className="bg-zinc-950 text-zinc-100">
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              No
            </th>
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              Payment Id
            </th>
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              Course
            </th>
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              Student
            </th>
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              Amount
            </th>
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              Status
            </th>
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              Date
            </th>
          </tr>
        </thead>
        <tbody style={{ background: "pink" }}>
          {paymentResponse &&
            paymentResponse.map((payment, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-purple-400" : ""}
              >
                <td className="py-4 px-6 text-center">{index + 1}</td>
                <td className="py-4 px-6">{payment._id}</td>
                <td className="py-4 px-6">{payment.course}</td>
                <td className="py-4 px-6">{payment.student}</td>
                <td className="py-4 px-6">{payment.amount}</td>
                <td className="py-4 px-6">{payment.status}</td>
                <td className="py-4 px-6">{payment.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPayments;
