import express from "express";
const router = express.Router();
import {User} from "../models/user-model";
import { hashService } from "../services/hash-service";

router.post("/register", async (req,res) => {
    
    const {email, password} = req.body;

    try{
        const hashedPassword = await hashService.hash_password(password);
        const user = new User({email, password: hashedPassword});
        await user.save();
        res.status(201).send(user);
    }catch(err){
        console.log(err)
        res.status(500).send("something went wrong")
    }
    

})


export {router as registerRouter}