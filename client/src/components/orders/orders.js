import { useEffect, useState } from "react";
import { Navbar } from "../navbar/Navbar";
import "./orders.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { OrderItem } from "./orderItem";
import { authenticate } from "../../services/auth";

export const Orders = (props) => {


    const navigate = useNavigate();
    const [orders,setOrders] = useState([]);

    useEffect(() => {

        authenticate(navigate);

        axios.get("http://localhost:3002/orders")
            .then(res => {
                setOrders(res.data);
            }).catch(err =>{
                console.error(err);
            })
    },[])

    const ordersList = () => {
        return orders.map(order => <OrderItem order={order}  />)
    }


    return <div className="orders-page">
            <Navbar/>
            <div className="orders-page-body">
                {orders.map(order => <OrderItem order={order}  />)}
            </div>
        </div>
}