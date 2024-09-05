import "./ticket-card.css"
import { Link,useNavigate } from "react-router-dom";

import axios from "axios"

export const TicketCard = (props) =>{

    const navigate = useNavigate();

    const onSubmit =  async (event) => {
        event.preventDefault();
        const orderRes = await axios.post("http://localhost:3002/orders",{ticketId:props.ticket._id});
        navigate(`/order/${orderRes.data._id}`);
    }



    const ticket = props.ticket;
    const ordertUrl = `/order/${ticket._id}`;
    return <div className="card ticket-card">
        <div className ="card-body">
            <form onSubmit={onSubmit}>
                <h4 className="card-title">{ticket.title}</h4>
                <div className="card-text">Price: {ticket.price}</div>
                <button className="btn btn-secondary" >Create Order</button>
            </form>
            
        </div>
    </div>
}