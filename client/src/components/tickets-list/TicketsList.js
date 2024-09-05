import {useEffect, useState} from "react";
import axios from "axios";
import { TicketCard } from "./TicketCard";
import { Navbar } from "../navbar/Navbar";
import "./tickets-lists.css";
import { authenticate } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export const TicketsList = (props) => {


    const [tickets,setTickets] = useState([]);
    const navigate = useNavigate();
 
    useEffect(() => {

        authenticate(navigate);

        axios.get("http://localhost:3001/tickets")
            .then(res => {
                const filteredTickets = res.data.filter(ticket => ticket.orderId == null);
                setTickets(filteredTickets);
            });
    },[]);


    const ticketsCards = tickets.map(ticket => {
        return <TicketCard ticket={ticket} /> 
    });

    return <div className="tickets-list">
        <Navbar/>
        <div className="tickets-list-body">
        {ticketsCards}
        </div>
    </div>
    

    
}