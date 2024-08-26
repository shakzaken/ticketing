import express  from "express"
import  bodyParser from "body-parser"
import mongoose from 'mongoose'

import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/create-ticket"; 
import { getTicketsRouter } from "./routes/get-tickets";
import { updateTicketRouter } from "./routes/update-ticket";

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
    name:"session",
    keys:['key1','key2']
}))

app.use(createTicketRouter)
app.use(getTicketsRouter)
app.use(updateTicketRouter)



app.listen(3001, async () => {
    
    await mongoose.connect("mongodb://127.0.0.1:27017/tickets")
    console.log("connected to mongodb")
    console.log("Tickets application listen on port 3001")
});