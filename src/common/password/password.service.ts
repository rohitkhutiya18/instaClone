import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt'
@Injectable()
export class PasswordService {
    async comparePassword(password:string,hash:string){
        const decode = await bcrypt.compare(password,hash) 
        return decode;
    }
}
