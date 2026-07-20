import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsguardGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService,private readonly configService:ConfigService){}
  async canActivate(
    context: ExecutionContext,
  ){
    const client = context.switchToWs().getClient()
  
    
   const token =
  client.handshake.auth?.token ||
    client.handshake.headers.authorization?.split(" ")[1];

    if(!token){
      throw new UnauthorizedException("You are not loged in");
    }

   try {

     const decode = await this.jwtService.verifyAsync(token,{
      secret:this.configService.get('accessTokenSecret')
     })
     client.user = decode;

     return true
   } catch (error) {

  console.log("Auth JWT ERROR:", error);

  throw new WsException("invalid token");

}


  }
}
