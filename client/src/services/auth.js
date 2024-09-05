import axios from "axios";

export const authenticate = (navigate) => {
    const token = localStorage.getItem("token");
    if (token){
        axios.defaults.headers['Authentication'] = token;
    }else{
        navigate("/login")
    }
}