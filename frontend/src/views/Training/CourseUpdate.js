import { useEffect, useState} from "react"
import {Navigate, useNavigate, useParams } from "react-router-dom"
import {useCoursesContext} from "../../hooks/useCoursesContext"

const UpdateCourse = () => {

    const [name, setName] = useState('')
    const [courseCode, setcourseCode] = useState('')
    const [duration, setDuration] = useState('')
    const [description, setDescription] = useState('')
    const [files, setFile] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const {id} = useParams()
    let navigate = useNavigate()

    //fetch current data to the form
    useEffect(() => {
        const fetchCourse = async() => {

            fetch(`/api/courses/${id}`)

            .then(response => response.json())
            .then(data => {
                console.log(data)
                setName(data.name)
                setcourseCode(data.courseCode)
                setDuration(data.duration)
                setDescription(data.description)
                setFile(data.files)
                setEmptyFields([])
            })
            .catch(error => {
                console.log(error)
            })
        }
        fetchCourse()
    }, [id])

    //send updated data to the form
    const handleSubmit = async (e) => {
        e.preventDefault()

        const course = {name, courseCode, duration, description, files}

        const response = await fetch(`/api/courses/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            console.log('Course updated.', json)
            navigate('/trainingpanel')
        }
    }
    
    //update course
    return (
        <div className="update">
        <form className="update" >
            <h3><center>Update Course</center></h3>
            <br/>

            <lable>Course Name :</lable>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <lable>Course Code :</lable>
            <input 
                type="text"
                onChange={(e) => setcourseCode(e.target.value)}
                value={courseCode}
            />

            <lable>Duration :</lable>
            <input 
                type="number"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
            />

            <lable>Description :</lable>
            <textarea name="description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                style={{ width: "660px", height: "100px", marginBottom: "10px" }}
            />

            <lable>Thumbnail :</lable>
            <input type="file" 
                id="myfile"
                onChange={(e) => setFile(e.target.files[0])}
                value={files}
                className={emptyFields.includes('file') ? 'error' : ''}
                 name="filename"
            />

            <button className="TrainingButton" onClick={handleSubmit}>Update</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div>
    )
}

export default UpdateCourse