//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CoursesView = ({ course }) => {
    return(
        <div className="course-details">
            <table class="course-info">
                <tr>
                    <td>
                        <img src = {`http://localhost:4000/${course.file}`} alt="Course Image" style={{height: 200}} />
                    </td>
                    <td>
                        <p className="side"><strong>Name : </strong>{course.name}</p>
                        <p className="side"><strong>Course code : </strong>{course.courseCode}</p>
                        <p className="side"><strong>Duration (hrs): </strong>{course.duration}</p>
                        <p className="description"><strong>Description : </strong>{course.description}</p><br/>
                    </td>
                </tr>
            </table>
            <p>{formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
            <a href={`/LectureContent/${course._id}`}>
            <button className="TrainingUpdate"> View content </button>                
                </a>
        </div>
    )
}

export default CoursesView