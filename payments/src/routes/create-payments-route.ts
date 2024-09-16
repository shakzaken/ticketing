import express from "express";
import { OrderModel } from "../models/order-model";
import { PaymentModel } from "../models/payment-model";
import { OrderStatus } from "../common/order-status";
import { PaymentSucceedPublisher } from "../events/payment-succeed-publisher";
import { natsWrapper } from "../nats-wrapper";
import { paymentSucceedProducer } from "../kafka/payment-succeed-producer";
import { kafkaClient } from "../kafka-wrapper";
const router = express.Router();



router.post("/payments",async (req,res) => {

    const {orderId} = req.body;

    const order = await OrderModel.findById(orderId);
    if(order == null){
        return res.status(400).send("orderId is invalid");
    }

    if(order.status != OrderStatus.Created){
        return res.status(400).send("order is cancelled or completed")
    }

    const payment = new PaymentModel({
        orderId: orderId
    })
    await payment.save();

    // new PaymentSucceedPublisher(natsWrapper.client).publish({
    //     orderId:orderId,
    //     paymentId: payment._id
    // });

    paymentSucceedProducer.send({
        orderId:orderId,
        paymentId: payment._id
    },payment._id.toString())
    
    res.status(200).send("payment succeed");

});

export { router as createPaymentRouter}