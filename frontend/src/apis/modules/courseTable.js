import api from "../axios";
const resources = '/api/courses';

export default {
    getAllCourses:() => api.get(`${resources}/`)
}