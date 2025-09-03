import api from "./api";

const authService = {
    login: (credentials) => api.post("auth/login", credentials)
}

export default authService