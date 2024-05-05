import { CoursesContext } from "../context/CourseContext";
import { useContext } from "react";

export const useCoursePDFContext = () => {
    const context = useContext(CoursesContext)

    if (!context) {
        throw new Error("useCoursesContext must be used within a CoursePDFContextProvider")
    }  

    return context
}