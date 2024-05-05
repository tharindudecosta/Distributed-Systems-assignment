import { createContext, useReducer } from "react";

export const attendanceContext = createContext();

export const attendanceReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ATTENDANCE':
      return {
        workouts: action.payload
      };
    case 'CREATE_ATTENDANCE':
      return {
        workouts: [action.payload, ...state.records]
      };
    case 'DELETE_ATTENDACNE':
        return{
            workouts: state.workouts.filter((w)=>w._id !== action.payload._id)
        }
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  });
  return (
    <WorkoutsContext.Provider value={{...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
