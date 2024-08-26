import express from "express";
const router = express.Router();
import {User} from "../models/user-model";
import { hashService } from "../services/hash-service";
import { jwtService } from "../common/jwt-service";
import { UserDto } from "../common/user-dto";
import { TokenExpiredError } from "jsonwebtoken";
import { requireAuth } from "../common/require-auth";


router.post("/current-user",requireAuth ,async (req,res) => {
    
    //@ts-ignore
    const user = req.currentUser;

    res.status(200).send(user);

})


export {router as currentUserRouter}