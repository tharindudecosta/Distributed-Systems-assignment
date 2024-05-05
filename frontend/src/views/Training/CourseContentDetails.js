import { useState } from "react";
import { useLecturesContext } from "../../hooks/useLecturesContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import SoloAlert from 'soloalert';
import "react-toastify/dist/ReactToastify.css";

const CourseContentDetails = ({ lecture, handleCompletion }) => {
  const { dispatch } = useLecturesContext();
  const [isChecked, setIsChecked] = useState(lecture.completed);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    handleCompletion(lecture._id, !isChecked);
  };

  const handleClick = async () => {
    const response = await fetch("/api/courseContents/" + lecture._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_LECTURE", payload: json });
      toast.warn("Course deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDeleteConfirmation = () => {
    SoloAlert.confirm({
      title: "Delete Confirmation",
      body: "Are you sure you want to delete this Lecture?",
      icon: "warning",
      theme: "light",
      onOk: handleClick,
      onCancel: function () {},
    });
  };

  const renderMedia = () => {
    const file = lecture.file;
    if (file.endsWith('.pdf')) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href={`http://localhost:4000/${file}`} download>
            <button className="TrainingButton" style={{ margin: "0 auto" }}>Download Note</button>
          </a>
        </div>
      )
    } else if (file.endsWith('.zip')) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href={`http://localhost:4000/${file}`} download>
            <button className="TrainingButton" style={{ margin: "0 auto" }}>Download Quiz</button>
          </a>
        </div>
      )
    } else if (file.endsWith('.mp4') || file.endsWith('.webm') || file.endsWith('.3gpp')) {
      return (
        <video
          src={`http://localhost:4000/${file}`}
          alt="Lecture Video"
          style={{ height: 250 }}
          controls
        />
      )
    }
  }  

  const renderCheckbox = () => {
    // if (lecture.file.endsWith('.pdf') || lecture.file.endsWith('.zip')) {
    //   return null; // return nothing if the file is PDF or ZIP
    // }
    // return (
    //   <div>
    //     <input
    //       type="checkbox"
    //       className="CompleteLeccheck"
    //       name="CompleteLec"
    //       value="CompleteLec"
    //       checked={isChecked}
    //       onChange={handleCheckboxChange}
    //     />
    //     <label htmlFor="CompleteLec" className="CompleteLec">
    //       Complete
    //     </label>
    //   </div>
    // );
    return null;
  };

  return (
    <div className="course-details">
      <table class="course-info">
        <tr>
          <td>
            <p classname="LecName" style={{ fontSize: "25px" }}>
              <strong>{lecture.title}</strong>
            </p>
          </td>
          <td>
            {renderMedia()}
          </td>
        </tr>
      </table>

      {renderCheckbox()}

      <p>
        {formatDistanceToNow(new Date(lecture.createdAt), { addSuffix: true })}
      </p>

      {/* Delete button */}
      <span className="material-symbols-outlined" onClick={handleDeleteConfirmation}>
        <FontAwesomeIcon icon={faTrashAlt} color="#ff6666" />
      </span>
    </div>
  );
};

export default CourseContentDetails;
