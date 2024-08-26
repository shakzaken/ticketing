import {Schema,model} from "mongoose";


export interface IUser {
    _id: string;
    email: string;
    password: string;
}


const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export const User = model<IUser>("User",userSchema);

const user = new User({
    email: "toto",
    password: "23",
})

