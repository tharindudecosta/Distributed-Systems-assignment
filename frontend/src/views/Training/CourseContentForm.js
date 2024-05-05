import { useState } from "react";
import { useLecturesContext } from "../../hooks/useLecturesContext";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseContentFrom = ({lectureId}) => {
    const {dispatch} = useLecturesContext()

    const [title, setTitle] = useState('')
    const [file, setFile] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const courseContent = {title, file}

        let data = new FormData();
        data.append('title', courseContent.title);
        data.append('file', courseContent.file);
        data.append('courseId', lectureId);

        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/api/courseContents',
            data : data
        };

        axios.request(config)
        .then((response) => {
            console.log(response);
            response.statusCode = 200;
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
            // if(error.response && error.response.data && error.response.data.error) {
            //     toast.POSITION(error.response.data.error)
            // }
            if(error.response.status === 400){
                toast(error.response.data.error)
            }
            
        })
    }

    return (
        <div>
            <form className="create" onSubmit={handleSubmit}>
                <h3>Upload Course Content</h3>
                <br/>

                <label>Title :</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />

                {/* <input 
                    type="file"
                    id="myfile"
                    onChange={(e) => setFile(e.target.files[0])}
                    className={emptyFields.includes('file') ? 'error' : ''}
                    accept="video/*"
                    name="filename"
                /> */}

                <input 
                    type="file"
                    id="myfile"
                    onChange={(e) => setFile(e.target.files[0])}
                    className={emptyFields.includes('file') ? 'error' : ''}
                    accept="video/*, application/pdf, application/zip"
                    name="filename"
                />

                <button className="TrainingButton">Upload</button>
                {error && <div className='error'>{error}</div>}
            </form>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </div>
    )
}

export default CourseContentFrom
