import { useState } from "react";
import { Navbar } from "../navbar/Navbar";
import "./create-ticket.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateTicket = (props) => {


    const [title,setTitle] = useState(null);

    const [price,setPrice] = useState(null);

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        

        event.preventDefault();
        await axios.post("http://localhost:3001/tickets",{title,price});
        navigate("/");
        
    }


    return <div className="create-ticket-page">
        <Navbar></Navbar>
        <div className="create-ticket-page-body">

        <h2>Create Ticket</h2>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label  className="form-label">Title</label>
                <input type="title" className="form-control" value={title}
                onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label  className="form-label">Price</label>
                <input  className="form-control" value={price}
                onChange={e => setPrice(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
            

        </div>
    </div>
}