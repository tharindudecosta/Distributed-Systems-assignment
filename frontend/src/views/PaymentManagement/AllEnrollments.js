import React, { useEffect, useState } from "react";
import EnrollmentSingle from "./EnrollmentSingle";
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const AllEnrollments = () => {
  const [enrollmentResponse, setEnrollmentResponse] = useState();
  const [search, setSearch] = useState("");

  const createPDF = (enrollmentResponse) => {
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
                { text: "All Content", style: "tableHeader" },
                { text: "Completed", style: "tableHeader" },
                { text: "Date Enrolled", style: "tableHeader" },
              ],
              ...enrollmentResponse
                .filter((enrollment) => {
                  if (search === "") {
                    return enrollment;
                  } else if (
                    enrollment._id
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    enrollment.studentId
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    enrollment.courseId
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return enrollment;
                  }
                })
                .map((enrollment) => [
                  { text: enrollment._id, style: "tableCell" },
                  { text: enrollment.courseId, style: "tableCell" },
                  { text: enrollment.studentId, style: "tableCell" },
                  { text: enrollment.allContent, style: "tableCell" },
                  { text: enrollment.completed, style: "tableCell" },
                  { text: enrollment.createdAt, style: "tableCell" },
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
    pdfDocGenerator.download("Enrollment_Data.pdf");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/enrollmentService/enrollments/all"
        );

        if (response.status == 200) {
          try {
            for (let index = 0; index < response.data.length; index++) {
              const student = response.data[index].studentId;
              console.log(student);
              const studentResponse = await axios.get(
                `http://localhost:4000/api/userSevice/users/getProfile/${student}`
              );
              const course = response.data[index].courseId;
              const courseResponse = await axios.get(
                `http://localhost:4000/api/courseService/courses/${course}`
              );

              response.data[index].studentId = studentResponse.data.name;
              response.data[index].courseId = courseResponse.data.name;
            }
          } catch (error) {
            console.error("Error:", error);
          }
          setEnrollmentResponse(response.data);
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
        onClick={() => createPDF(enrollmentResponse)}
        title="Download PDF"
        className="pdfBtn"
      >
        Download
      </button>

      <table className="min-w-full bg-slate-200">
        <thead>
          <tr className="bg-zinc-950 text-zinc-100">
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
        <tbody>
          {enrollmentResponse &&
            enrollmentResponse
              .filter((enrollment) => {
                if (search === "") {
                  return enrollment;
                } else if (
                  enrollment._id.toLowerCase().includes(search.toLowerCase()) ||
                  enrollment.studentId
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  enrollment.courseId
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return enrollment;
                }
              })
              .map((enrollment) => (
                <EnrollmentSingle
                  key={enrollment._id}
                  enrollment={enrollment}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllEnrollments;
