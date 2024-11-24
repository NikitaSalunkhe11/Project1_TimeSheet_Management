import axios from "axios"

const ApiInstance = axios.create({
   baseURL:"http://localhost:8080",
    withCredentials : true
})

export default ApiInstance;