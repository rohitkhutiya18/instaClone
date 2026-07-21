import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type Request } from 'express';
import { LoginDTO } from './dto/login.dto';


@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body:{data:LoginDTO},@Res({passthrough:true}) res:Response){
    
    return this.authService.login(body.data.email,body.data.password,res);
     
  }

  @Post('/refresh')
  generateAccessToken(@Req() req:Request){
         return this.authService.refreshToken(req.cookies.refreshToken);
  }

  @Post('/send-otp')
  sendOtp(@Body() body:{email:string}){
     return this.authService.sendMailToUser(body.email);
  }

  @Post("/verify-otp")
  verifyOtp(@Body() body:{email:string,otp:number}){
   
         return this.authService.verifyOTP(body.email,body.otp)
  }
}
