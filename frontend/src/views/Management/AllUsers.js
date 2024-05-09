import React, { useEffect, useState } from 'react'
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const AllUsers = () => {
    const [users, setusers] = useState();
    const [search, setSearch] = useState("");
  
  
    const createPDF = (users) => {
      const documentDefinition = {
        content: [
          { text: "User Records", style: "header" },
          {
            table: {
              headerRows: 1,
              widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
              body: [
                [
                  { text: "User Id", style: "tableHeader" },
                  { text: "Name", style: "tableHeader" },
                  { text: "Phone", style: "tableHeader" },
                  { text: "Email", style: "tableHeader" },
                  { text: "Role", style: "tableHeader" },
                ],
                ...users
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
            `http://localhost:4000/api/userSevice/users/allUsers`
        );
          console.log(response);
  
          if (response.status == 200) {
            setusers(response.data);
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
        className="inputBar m-3"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={() => createPDF(users)}
        title="Download PDF"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-4 rounded inline-flex items-center"
      >
        <svg
          class="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        Download
      </button>
      <a href={"/RegisterUser"}>
        <button className="buy-button">Add New User</button>
      </a>
      <table className="min-w-full bg-slate-200 m-1">
        <thead>
          <tr className="bg-zinc-950 text-zinc-100">
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              No
            </th>
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              User Id
            </th>
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              Name
            </th>
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              Email
            </th>
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              Phone
            </th>
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              Role
            </th>
            <th scope="col" className="py-3 px-6 font-medium text-zinc-100">
              Date Joined
            </th>
          </tr>
        </thead>
        <tbody style={{ background: "pink" }}>
          {users &&
            users.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-purple-400" : ""}
              >
                <td className="py-4 px-6 text-center">{index + 1}</td>
                <td className="py-4 px-6">{user._id}</td>
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.phone}</td>
                <td className="py-4 px-6">{user.role}</td>
                <td className="py-4 px-6">{user.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers
