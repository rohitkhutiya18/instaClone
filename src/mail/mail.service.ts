import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { createTransport } from 'nodemailer';
import { mailEntity } from './enitities/mail.entity';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';

@Injectable()
export class MailService {
    private transport;

    constructor(private readonly config : ConfigService,
        @InjectRepository(mailEntity) private mailEntity :Repository<mailEntity>
    ){
        this.transport = createTransport({
            service:"gmail",
            auth:{
                user:this.config.get('userMail'),
                pass:this.config.get('userMailPassKey'),
            }
        })
    }

    async sendMail(email:string,html:string){
       try {
        
         const info = await this.transport.sendMail({
             from : `${this.config.get('userMail')}`,
             to:email,
             subject:"OTP verification",
             html:html
         })
 
         return info
       } catch (error) {
        console.log(error)
        throw new InternalServerErrorException(`Email not send`);
       }
    }

    async setOTP(email:string){
    const otp = randomInt(1000,10000);

    const existingOtp = await this.mailEntity.findOne({where:{email}});

    if(existingOtp){
        throw new BadRequestException("you already have working otp");
    }

        const data = {
            email,otp
        }
        
       const addInDb = this.mailEntity.create(data);

       await this.mailEntity.save(addInDb);

       const html = `<p> your OTP </p> <h2>${otp}</h2>  <br></br>  <h3> valid for 5min </h3>`
       await this.sendMail(email,html);

       setTimeout(async ()=>{
        await this.mailEntity.remove(addInDb)
       },1*60*1000)

       return {message:"otp send successfully",otp};
    }

    async verifyOTP(email:string,otp:number){
         const record = await this.mailEntity.findOne({where:{email}})

         if(!record){
            throw new BadRequestException("email not found");
         }
         
         if(otp != record?.otp){
               throw new UnauthorizedException("you entered wrong top");
         }

         return {mesage:"email verify"};
    }
}
