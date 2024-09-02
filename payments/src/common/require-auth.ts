import {Request,Response,NextFunction} from "express";
import { jwtService } from "./jwt-service";

const requireAuth = (req: Request,res: Response,next: NextFunction) => {

    const token = req.session!.token;
    if(token == null){
        return res.status(401).send("User is not logged in");
    }

    try{
        const user = jwtService.verify(token);
        //@ts-ignore
        req.currentUser = user;
        return next();

    }catch(err){
        return res.sendStatus(401).send("User is not authorized");
    }
    
}

export {
    requireAuth
}