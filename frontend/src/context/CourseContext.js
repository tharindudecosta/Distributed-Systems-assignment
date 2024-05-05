import { createContext, useReducer } from "react";

export const CoursesContext = createContext()

export const coursesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COURSES':
            return{
                courses: action.payload
            }
        case 'CREATE_COURSE':
            return{
                courses: [action.payload, ...state.courses]
            }
        case 'DELETE_COURSE':
            return{
                courses: state.courses.filter((c) => c._id !== action.payload._id)
            }
        case 'SET_LECTURES':
            return{
                lectures: action.payload
            }
        case 'CREATE_LECTURES':
            return{
                lectures: [action.payload, ...state.lectures]
            }
        case 'DELETE_LECTURE':
            return{
                lectures: state.lectures.filter((c) => c._id !== action.payload._id)
            }
        case 'SET_COURSEPDF':
            return{
                coursepdf: action.payload
            }
        case 'CREATE_COURSEPDF':
            return{
                coursepdf: [action.payload, ...state.coursepdf]
            }
        case 'DELETE_COURSEPDF':
            return{
                coursepdf: state.coursepdf.filter((c) => c._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const CoursesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(coursesReducer, {
        courses: null,
        ////////////////////////////////
        lectures: null
    })

    return (
        <CoursesContext.Provider value={{...state, dispatch}}>
            { children }
        </CoursesContext.Provider>
    )
}