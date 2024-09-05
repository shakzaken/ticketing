import express from "express";
const router = express.Router();
import {User} from "../models/user-model";
import { hashService } from "../services/hash-service";
import { jwtService } from "../common/jwt-service";
import { UserDto } from "../common/user-dto";


router.post("/login",async (req,res) => {
    
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email:email}).exec();
        if(user == null){
            return res.send("email is invalid");
        }
    
        const passwordResult = await hashService.compare(password,user.password)
        if(passwordResult == false){
            return res.status(400).send("password is incorrect")
        }
        const userDto :UserDto = {
            id: user._id,
            email:user.email
        }
        const token: string =  jwtService.sign(userDto);

        //@ts-ignore
        req.session.token = token; 
    
        return res.status(200).send({token});
    }
    catch(err){
        res.status(500).send("something wrong happend...")
    }
    

})


export {router as loginRouter}