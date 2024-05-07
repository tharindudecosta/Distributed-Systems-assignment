import React from "react";
import VideoPlayer from "../../components/VideoPlayer";
import axios from "axios";

const CourseContentSingle = ({ content }) => {
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm("Are You sure you want to delete record?")) {
        const response = await axios.delete(
          `http://localhost:4000/api/courseContentService/courseContents/delete/${content._id}`
        );
        if (response.status == 200) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <table className="course-info">
        <tr>
          <td>
            <VideoPlayer width={660} height={400} />
            <p className="side">
              <strong>Name : </strong>
              {content.title}
            </p>
            <p className="side">
              <strong>Description : </strong>
              {content.description}
            </p>
            <br />
            <br />
            <br />
          </td>
          <td>
            <button onClick={handleClick}>Delete</button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default CourseContentSingle;
