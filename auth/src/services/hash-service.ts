
import bcrypt from "bcrypt"

const hashService = {
    async hash_password(password: string){
        return await bcrypt.hash(password,10);
    },
    async compare(password:string, hashPassword: string){
        return await bcrypt.compare(password,hashPassword)
    }
}

export {
    hashService
}

