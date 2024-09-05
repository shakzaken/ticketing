import {useNavigate, useParams} from "react-router-dom";
import "./order.css";
import { Navbar } from "../navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { authenticate } from "../../services/auth";


export const Order = (props) => {
    

    const navigate = useNavigate();
    const {id} = useParams();

    const [order,setOrder] = useState({})

   
   const [expiration,setExpiration] = useState(60);

    

    const intervalId = setInterval(() => {
        if(expiration < 0 || expiration == 0 ){
            clearInterval(intervalId)
            navigate("/")
        }else{
            setExpiration(expiration -5);
        } 
    },5000)

    useEffect(() => {

        authenticate(navigate);
        
        axios.get(`http://localhost:3002/orders/${id}`)
            .then(res => {
                setOrder(res.data);
            
            });

    },[])

    const onPay = async () => {
        try{
            await axios.post("http://localhost:3004/payments",{orderId:id});
            navigate("/orders");

        }catch(err){
            console.log(err);
        }
        
    }


    return <div className="order-page">
        <Navbar></Navbar>
        <div className="order-page-body">
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Your Order</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Title: {order.ticket?.title}</h6>

                    <h6 className="card-subtitle mb-2 text-body-secondary">Price: {order.ticket?.price}</h6>
                    <button onClick={onPay} className="btn btn-primary card-button">Pay</button>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Order Will expire in:  {expiration}</h6>
                </div>
            </div>
        </div>
        
    </div>
}