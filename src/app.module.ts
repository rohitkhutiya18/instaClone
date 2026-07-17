import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { PasswordModule } from './common/password/password.module';
import { MailModule } from './mail/mail.module';
import { PostModule } from './post/post.module';
import { CloudnaryModule } from './cloudnary/cloudnary.module';
import { FollowModule } from './follow/follow.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UserModule,AuthModule,
    ConfigModule.forRoot({isGlobal:true}),
  TypeOrmModule.forRoot({
    type:"postgres",
    database:process.env.Database,
    username:process.env.DbUserName,
    port:5432,
    host:process.env.DbHost,
    password:process.env.DbPassword,
    entities:[UserEntity],
    autoLoadEntities:true,
    synchronize:true

  }),
  PasswordModule,
  MailModule,
  PostModule,
  CloudnaryModule,
  FollowModule,
  ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
