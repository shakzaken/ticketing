import { useState } from "react"
import "./login.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";
export const LoginPage = () => {


    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null)

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        try{
            const res = await axios.post("http://localhost:3006/login",{email,password});
            

            localStorage.setItem("token",res.data.token);
            axios.defaults.headers['auth'] = res.data.token;
            navigate("/");
        }catch(err){
            throw err;
        }
        
        

    }


    return (<div className="login-page container">
        <h2>Login Page</h2>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" value={email}
                onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" value={password}
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>)
}