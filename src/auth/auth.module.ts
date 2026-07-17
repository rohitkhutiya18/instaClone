import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PasswordModule } from 'src/common/password/password.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { JwtGaurd } from './auth.gaurd';

@Module({
  imports:[JwtModule.register({
    secret:`${process.env.accessTokenSecret}`,
    signOptions:{
      expiresIn:"60m"}
  }),UserModule,PasswordModule,MailModule],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
