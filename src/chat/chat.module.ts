import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateWay } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { FollowEntity } from 'src/follow/entities/follow.entity';
import { FollowModule } from 'src/follow/follow.module';
import { JwtModule } from '@nestjs/jwt';
import { SocketService } from './socket.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([ChatEntity,FollowEntity]),FollowModule,JwtModule.register({
    secret:`${process.env.accessTokenSecret}`,
    signOptions:{
      expiresIn:"60m"}
  })],
  controllers: [],
  providers: [ChatService,SocketService,ChatGateWay],
})
export class ChatModule {}
