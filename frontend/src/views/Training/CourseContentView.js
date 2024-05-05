  import { useState } from "react";
  import formatDistanceToNow from 'date-fns/formatDistanceToNow'

  const CourseContentView = ({ lecture, handleCompletion }) => {
    const [isChecked, setIsChecked] = useState(lecture.completed);

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
      handleCompletion(lecture._id, !isChecked);
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
      if (lecture.file.endsWith('.pdf') || lecture.file.endsWith('.zip')) {
        return null; // return nothing if the file is PDF or ZIP
      }
      return (
        <div>

        <div>
          <input
            type="checkbox"
            className="CompleteLeccheck"
            name="CompleteLec"
            value="CompleteLec"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="CompleteLec" className="CompleteLec">
            Complete
          </label>
        </div>
        </div>
      );
    };

    return (
      <div className="course-details">
        <table className="course-info">
          <tr>
            <td>
              <p className="LecName" style={{ fontSize: "25px" }}>
                <strong>{lecture.title}</strong>
              </p>
            </td>
            <td>{renderMedia()}</td>
          </tr>
        </table>

        {/* {renderCheckbox()} */}

        <p>{formatDistanceToNow(new Date(lecture.createdAt), { addSuffix: true })}</p>
      </div>
    );
  };

  export default CourseContentView;
