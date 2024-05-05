
import { CoursesContext } from "../context/CourseContext";
import { useContext } from "react";

export const useCoursesContext = () => {
    const context = useContext(CoursesContext)

    if (!context) {
        throw new Error("useCoursesContext must be used within a CourseContextProvider")
    }  

    return context
}