import {  Injectable,  UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/common/password/password.service';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService : UserService,
        private passwordService : PasswordService,
        private jwtService : JwtService,
        private configService : ConfigService,
        private mailService : MailService
    ){}

    async login(email:string,password:string,res){
        const user = await this.userService.findByEmail(email);

        if(!user){
            throw new UnauthorizedException("user not found with this email") 
        }

        const comaprePassword = await this.passwordService.comparePassword(password,user.password);

        if(!comaprePassword){
            throw new UnauthorizedException("password does't match");
        }

        const payload = {email:user.email,id:user.id}
      
        const [refreshToken,accessToken] = await Promise.all([
            this.jwtService.signAsync(payload,{
            secret:this.configService.get("refreshTokenSecret"),
            expiresIn:"5d"
        }),

          this.jwtService.signAsync(payload,{
            secret:this.configService.get("accessTokenSecret"),
            expiresIn: 5 *60 *60 * 60 * 60 * 1000
        })])

        user.refreshToken = refreshToken
        await this.userService.saveUser(user)

        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            sameSite:'strict',
            maxAge:5 * 24 * 60 * 60 * 1000,
        })

        return {
            id:user.id,
            name:user.userName,
            email:user.email,
            refreshToken:user.refreshToken,
            url:user.profilePic,
            accessToken}

    }

    async refreshToken(refreshToken:string){
        if(!refreshToken){
            throw new UnauthorizedException("refresh token missing")
        }

        const payload = await this.jwtService.verifyAsync(refreshToken,{
            secret:this.configService.get('refreshTokenSecret')
        });
        
        const user = await this.userService.findById(payload.id);

        if(!user || user.refreshToken !== refreshToken){
            throw new UnauthorizedException("Invalid Refresh token")
        }

        const accessToken = await this.jwtService.signAsync(payload,{
            secret:this.configService.get("accessTokenSecret"),
            expiresIn:'20m'
        })

        return {accessToken};
    }

   async sendMailToUser(email:string){
    return this.mailService.setOTP(email);
   }

   async verifyOTP(email:string,otp:number){
    return this.mailService.verifyOTP(email,otp)
   }

}
