import { useCoursesContext } from "../../hooks/useCoursesContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify'
import SoloAlert from 'soloalert';
import "react-toastify/dist/ReactToastify.css"

const CourseDetails = ({ course }) => {
    const {dispatch} = useCoursesContext()

    const handleClick = async () => {        
        // confirmation before deleting course
        const response = await fetch('/api/courses/' + course._id, {
            method: 'DELETE'
        })
        const json = await response.json()
        
        if(response.ok){
            dispatch({type: 'DELETE_COURSE', payload: json})
            toast.warn('Course deleted successfully!', {
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
            body: "Are you sure you want to delete this Course?",
            icon: "warning",
            theme: "light",
            onOk: handleClick,
            onCancel: function () {},
        });
    }

    return(
        <div>
            <div className="course-details">
                {/* Course details */}
                <table class="course-info">
                    <tr>
                        <td>
                            <img src={`http://localhost:4000/${course.file}`} alt="Course Image" style={{height: 150}} />
                        </td>
                        <td>
                            <p className="side"><strong>Name : </strong>{course.name}</p>
                            <p className="side"><strong>Course code : </strong>{course.courseCode}</p>
                            <p className="side"><strong>Duration (hrs): </strong>{course.duration}</p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <p className="description"><strong>Description : </strong>{course.description}</p><br/>
                        </td>
                    </tr>
                </table>

                {/* Course created date */}
                <p>{formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>

                {/* Add content button */}
                <a href={"/Lectures/" + course._id}>
                    <button className="TrainingAddcontent">Add content</button>                
                </a>

                {/* Update button */}
                <a href={"/CourseUpdate/" + course._id}>
                    <button className="TrainingUpdate">Update</button>
                </a>
                
                {/* Delete button */}
                <span className="material-symbols-outlined" onClick={handleDeleteConfirmation}>
                    <FontAwesomeIcon icon={faTrashAlt} color="#ff6666" />
                </span>

            </div>
        </div>
    )
}

export default CourseDetails
