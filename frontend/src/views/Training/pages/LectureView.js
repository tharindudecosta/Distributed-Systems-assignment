import { useEffect, useState } from "react";
import { useLecturesContext } from "../../../hooks/useLecturesContext";

//components
import CourseContentView from "../CourseContentView"
import { useParams } from "react-router-dom";

const ContentView = () => {
    const {id} = useParams()
    const {lectures, dispatch} = useLecturesContext()
    const [completedCount, setCompletedCount] = useState(0)

    useEffect(() =>{
        const fetchLectures = async () => {
            const response = await fetch('/api/courseContents/' + id )
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_LECTURES', payload: json})
            }
        }

        fetchLectures()
    }, [])

    const handleCompletion = (lectureId, isChecked) => {
        dispatch({type: 'TOGGLE_LECTURE_COMPLETION', payload: {id: lectureId, completed: isChecked}})
        setCompletedCount(prevCount => isChecked ? prevCount + 1 : prevCount - 1)
    }

    const getCompletedCount = () => {
        if (!lectures) return 0
        const completedLectures = lectures.filter(lecture => lecture.completed)
        return completedLectures.length
    }

    useEffect(() => {
        setCompletedCount(getCompletedCount())
    }, [lectures])

    return (
        <div>
        <div className="homeViewLec">
            {/* <div className="card completed-count">
                {/* <div className="card-body">
                  {/* //==  <p className="card-text">{`Completed ${completedCount}`}</p> }
                </div> }
            </div> */}
            <br />
            <div className="courses">
               {lectures && lectures.map(lecture => (
                    <CourseContentView lecture={lecture} key={lecture._id} handleCompletion={handleCompletion} />
               ))}
            </div>
        </div>
        </div>
    )
}

export default ContentView
