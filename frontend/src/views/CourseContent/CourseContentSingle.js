import React from "react";
import VideoPlayer from "../../components/VideoPlayer";
import axios from "axios";
import swal from "sweetalert2";

const CourseContentSingle = ({ content }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      swal
        .fire({
          title: "Are you sure you want to delete this record?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            const deleteCourse = async () => {
              const response = await axios.delete(
                `http://localhost:4000/api/courseContentService/courseContents/delete/${content._id}`
              );
              console.log(response);
              if (response.status === 200) {
                swal
                  .fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }
            };

            deleteCourse();
          }
        });
    } catch (error) {
      swal.fire(
        "Error!",
        "An error occurred while deleting the item.",
        "error"
      );
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
            {role == "student" ? (
              ""
            ) : (
              <button className="delete-button pt-4" onClick={handleClick}>
                Delete
              </button>
            )}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default CourseContentSingle;
