import { useEffect } from "react";
import { useLecturesContext } from "../../../hooks/useLecturesContext";
// import { useCoursePDFContext } from "../../../hooks/useCoursePDFContext";
import CourseContentDetails from '../CourseContentDetails'
import CourseContentForm from '../CourseContentForm'
import TrainingAdminNavbar from '../../../components/trainingAdminNavbar';
// import CourseMaterialsForm from "../CourseMaterialsForm";
// import CourseMaterialsDetails from "../CourseMaterialsDetails";
import { useParams } from "react-router-dom";

// import CourseMaterialsForm from "../CourseMaterialsForm";

const Lectures = () => {
    const { id } = useParams();
    const { lectures, courseMaterials, dispatch } = useLecturesContext()
    // const {courseMaterials} = useCoursePDFContext()

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/courseContents/' + id)
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_LECTURES', payload: json })
            }
        }

        fetchCourses()
    }, [dispatch])

    return (
        <div>
            <TrainingAdminNavbar/>
        <div className="home">
            <div className="courses">
               {lectures && lectures.map(lecture => (
                    <CourseContentDetails lecture={lecture} key={lecture._id}/>
               ))}
            </div>
            <CourseContentForm lectureId={id} />
        </div>
        </div>
    )
}

export default Lectures