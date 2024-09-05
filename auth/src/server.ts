import express  from "express"
import  bodyParser from "body-parser"
import { registerRouter } from "./routes/register";
import { loginRouter } from "./routes/login";
import mongoose from 'mongoose'
import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import cookieSession from "cookie-session";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
    name:"session",
    keys:['key1','key2']
}))
app.use(cors())

app.use(registerRouter);
app.use(loginRouter);
app.use(currentUserRouter);
app.use(signoutRouter);


app.listen(3006, async () => {
    
    await mongoose.connect("mongodb://127.0.0.1:27017/auth")
    console.log("connected to mongodb")
    console.log("Auth application listen on port 3006")
});
