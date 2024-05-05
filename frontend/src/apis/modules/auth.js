import api from "../axios";
const resource = '/auth/login'

export default {
    login: (payload) => api.post(`${resource}/userLogin`, payload),
    currentUser: () => api.get(`${resource}/current-user`),
    logout: () => api.get(`${resource}/logout`),
}