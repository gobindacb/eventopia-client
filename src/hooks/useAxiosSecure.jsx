import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
    // baseURL: 'http://localhost:8000'
    baseURL: `${import.meta.env.VITE_API_URL}`
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logout} = UseAuth();
    // request interceptors to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        console.log('request stop by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // interceptors 401 & 403 status
    axiosSecure.interceptors.response.use(function(response) {
        return response;
    }, async (error) =>{
        const status = error.response.status;
        console.log('status error in the interceptor', status)
        // for 401 & 403 logout the user and move the user to the login 
        if(status === 401 || status ===403){
            await logout();
            navigate('/login')
        }
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;