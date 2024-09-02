
import jwt from "jsonwebtoken"
import { UserDto } from "./user-dto";
const secret = "xsdfs-asdassa-123123-ssa";

export const jwtService = {
    sign(user: UserDto): string {
        return jwt.sign({
            exp:Math.floor(Date.now() / 1000) + (60*60),
            data: user
        },secret);
    },
    //throws error
    verify(token: string) :UserDto {
        const result =  jwt.verify(token,secret)
        //@ts-ignore
        return result.data;
    }

}