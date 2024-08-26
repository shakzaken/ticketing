import express from "express";
import { requireAuth } from "../common/require-auth";
const router = express.Router();


router.post("/signout", requireAuth ,(req ,res) => {
    req.session = null;
    res.status(200).send("signed out successfully");
    
})

export {router as signoutRouter}