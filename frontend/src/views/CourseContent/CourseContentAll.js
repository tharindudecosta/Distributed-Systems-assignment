import React, { useEffect, useState } from "react";
import CourseContentSingle from "./CourseContentSingle";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Image } from "cloudinary-react";

const CourseContentAll = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [fileUrl, setFileUrl] = useState(null);

  const [courseContent, setCourseContent] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/courseService/courses/${id}`
        );
        setName(response.data.name);
        setDescription(response.data.description);
        // setInstructor(response.data.instructor);
        setPrice(response.data.price);
        setFileUrl(response.data.file.url);
        setStatus(response.data.status);

        if (response.status == 200) {
          try {
            const insresponse = await axios.get(
              `http://localhost:4000/api/userSevice/users/getProfile/${response.data.instructor}`
            );
            setInstructor(insresponse.data.name);
          } catch (error) {
            console.error("Error fetching data:", error);
          }

          try {
            const contentResponse = await axios.get(
              `http://localhost:4000/api/courseContentService/courseContents/course/${id}`
            );
            setCourseContent(contentResponse.data);
            console.log(contentResponse);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourseInfo();
  }, []);

  return (
    <div>
      <div className="text-white text-lg font-bold">
        <h2>
          {name} course by {instructor}
        </h2>
      </div>
      <div className="mx-auto flex flex-wrap pt-4 pb-12">
        <div className="w-full md:w-2/3 p-6 flex flex-col flex-grow flex-shrink">
          <div>
            <input
              type="text"
              style={{ width: "500px" }}
              placeholder="Search By ID or Name"
              className="inputBar m-4"
              onChange={(e) => setSearch(e.target.value)}
            />

            <a href={"/courseContentForm/" + id}>
              <button className="buy-button">Add Content</button>
            </a>
            {courseContent &&
              courseContent
                .filter((content) => {
                  if (
                    content.title.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return content;
                  } else if (search === "") {
                    return content;
                  }
                })
                .map((content) => (
                  <CourseContentSingle key={content._id} content={content} />
                ))}
          </div>
        </div>

        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink h-fit">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow p-4">
            <Image
              style={{ width: 250 }}
              cloudName="dsj8tuguz"
              publicId={fileUrl}
            />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentAll;
