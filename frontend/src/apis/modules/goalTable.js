import api from "../axios";
const resource = '/api/goals';

export default {
    getAllGoalTables: () => api.get(`${resource}/goalTable/`),
    getGoalTable: (id) => api.get(`${resource}/goalTable/${id}`),
    createGoalTable: (payload) => api.post(`${resource}/goalTable/`, payload),
    updateGoalTable: (id, payload) => api.patch(`${resource}/goalTable/${id}`, payload),
    deleteGoalTable: (id) => api.delete(`${resource}/goalTable/${id}`),
    getAllCategory:() => api.get(`${resource}/goalCategory/`),
    getAllTitles:() => api.get(`${resource}/goalTitle/`),
    getAllEmployees:() => api.get(`${resource}/empAssign/`),
    getAllEmail:() => api.get(`${resource}/empEmail/`),
    getEmailByID:(employeeId) => api.get(`${resource}/emailByID/${employeeId}`)
}
