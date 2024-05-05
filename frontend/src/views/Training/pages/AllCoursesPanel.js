
import { useEffect, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {useCoursesContext} from "../../../hooks/useCoursesContext"
import CourseContentViewAdmin from "../CourseContentViewAdmin"
import TrainingAdminNavbar from '../../../components/trainingAdminNavbar';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const View = () => {
    const { courses, dispatch } = useCoursesContext();
    const [search, setSearch] = useState("");
    const [showPreview, setShowPreview] = useState(false);

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
  
    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black"
      }
    };
  
    const createPDF = courses => {
      const documentDefinition = {
        content: [
          { text: "Course Record Details", style: "header" },
          {
            table: {
              headerRows: 1,
              widths: [180, 100, 100, "*"],
              body: [
                [
                  { text: "Name", style: "tableHeader" },
                  { text: "Course code", style: "tableHeader" },
                  { text: "Duration (hrs)", style: "tableHeader" },
                  { text: "Description", style: "tableHeader" }
                ],
                ...courses
                  .filter(course => {
                    if (search === "") {
                      return course;
                    } else if (
                      course.name.toLowerCase().includes(search.toLowerCase()) ||
                      course.courseCode.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return course;
                    }
                  })
                  .map(course => [
                    course.name,
                    course.courseCode,
                    course.duration,
                    course.description,
                  ])
              ]
            }
          }
        ],
        styles: styles,
        pageSize: 'A3',
        pageSize: {
          width: 1000,
          height: 800
        }
      };
      const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
      pdfDocGenerator.download("Course details report");
    };

    //get total course count
    const getAllCoursesCount = (courses) => {
      if (!courses) {
        return 0;
      }
      return courses.length;
    };

    const totalCoursesCount = getAllCoursesCount(courses);
    console.log(totalCoursesCount);
    
  
    return (
        <div>
            <TrainingAdminNavbar/>
            <div className="homeView">
                <div className="courses">
                <div className="courseCount">
                    <center><p className="totalCount">Total Courses {totalCoursesCount}</p></center>
                </div>
                    <input
                    type="text"
                    style={{ width: "500px" }}
                    placeholder="Search By ID or Name"
                    className="inputBar"
                    onChange={e => setSearch(e.target.value)}
                    />
                    <button className="GeneratePDF" onClick={() => createPDF(courses)} >Generate PDF</button>
                    {courses &&
                    courses
                        .filter(course => {
                        if (
                            search === "" ||
                            course.name.toLowerCase().includes(search.toLowerCase()) ||
                            course.courseCode.toLowerCase().includes(search.toLowerCase())
                        ) {
                            return course;
                        }
                        })
                        .map(course => (
                        <CourseContentViewAdmin key={course.id} course={course} />
                        ))}
                </div>
            </div>
            {/* {showPreview && <AssignCourse courseNamesArr={courseNamesArr} />}  */}
        </div>
    );
  };

  export default View


      