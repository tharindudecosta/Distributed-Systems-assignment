
import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import {useCoursesContext} from "../../../hooks/useCoursesContext"
import goalTable from "../../../apis/modules/goalTable";
import TrainingAdminNavbar from '../../../components/trainingAdminNavbar';
import { ToastContainer, toast } from 'react-toastify';
import SoloAlert from 'soloalert';
import "react-toastify/dist/ReactToastify.css"

const AssignCourse = () => {
  const form = useRef(null);
  const { courses, dispatch } = useCoursesContext();
  const [allEmp, setAllEmp] = useState('')

  const getCourseNames = (courses) => {
    const courseNames = courses && courses.map((course) => course.name);
    return courseNames;
  };

  const [courseNamesArr, setCourseNamesArr] = useState([]);

  useEffect(() => {
    const courseNames = getCourseNames(courses);
    setCourseNamesArr(courseNames || []);
  }, [courses]);

      console.log(courseNamesArr);

      useEffect(() => {
        const fetchCourses = async () => {
          const response = await fetch("/api/courses");
          const json = await response.json();
    
          if (response.ok) {
            dispatch({ type: "SET_COURSES", payload: json });
          }
        };
    
        fetchCourses();
      }, []);

      useEffect(() => {
        const fetchForDropdown = async () => {
            const allEmp = await (await goalTable.getAllEmail()).data
            setAllEmp(allEmp);
            console.log(allEmp)
        }

        fetchForDropdown()
    }, [])

  const sendEmail = (e) => {
    e.preventDefault();
  
    // Get the form data
    const formData = new FormData(form.current);
    const userName = formData.get('user_name');
    const userEmail = formData.get('user_email');
    const courseName = formData.get('message');
  
    // Check if all fields are selected
    if (userName === '-  Select  -' || userEmail === '-  Select  -' || courseName === '-  Select  -') {
      toast.warn('Please select all fields!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // Send the email
      emailjs.sendForm('service_w821x8s', 'template_ckfbdth', form.current, '0LMAqpZFvoghZIJET')
        .then((result) => {
          console.log(result.text);
          // Show success message
          toast.success('Course assigned successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // Reset the form
          e.target.reset();
        }, (error) => {
          console.log(error.text);
        });
    }
  };  

  return (
    <center>
        <br/><br/><br/>
        <div>
        <TrainingAdminNavbar/>
        <div className='containerAssign'>
        
        <form ref={form} onSubmit={sendEmail} className='create'>
            <center>   
                <h2 className='--text-center'> Assign Courses to Employees </h2>
            </center>
            <br/><br/>
            
            <label>Assign by : 
                <select name='user_name' style={{ width: '50%', height: '30px', marginLeft: '10px' }} required>
                    <option>-  Select  -</option>
                    <option>Training Manager</option>
                </select>
            </label>
            <br/>

            <lable>Assign to : 
                <select name='user_email' style={{ width: '50%', height: '30px', marginLeft: '10px' }} required>
                    <option>-  Select  -</option>
                    {allEmp && allEmp.map((emp) => (
                    <option key={emp._id} value={emp.email}>{emp.email}</option>
                ))}
                    {/* <option>kalindubihanfdo@gmail.com</option> */}
                </select>
            </lable>
            <br/><br/>

            <label>Course : 
            <select id="CourseSelect" name="message" style={{ width: '50%', height: '30px', marginLeft: '22px' }} required>
              <option>-  Select  -</option>
              {courseNamesArr?.map((courseName) => (
                <option key={courseName} value={courseName}>
                  {courseName}
                </option>
              ))}
            </select>
            </label>
            <br/><br/>

          <button type='submit' className="TrainingButton"> Assign </button>

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
      </div>
      <br/><br/><br/><br/><br/>
    </center>
  );
};

export default AssignCourse;
