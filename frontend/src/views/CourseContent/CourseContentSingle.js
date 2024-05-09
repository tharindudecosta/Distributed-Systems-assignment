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
    <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow mb-4">
      <table className="course-info">
        <tr>
          <td>
            <p className="side pb-4">
              <strong>Name : </strong>
              {content.title}
            </p>
            <VideoPlayer width={660} height={400} videoUrl={content.file.url} />
            <p className="side pt-4 pb-4">
              <strong>Description : </strong>
              {content.description}
            </p>
            <button className="delete-button pt-4" onClick={handleClick}>Delete</button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default CourseContentSingle;
