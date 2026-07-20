import { UseGuards, Injectable } from '@nestjs/common';
import { ChatService } from './chat.service';

import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { WsguardGuard } from './wsguard/wsguard.guard';
import { Server } from 'socket.io';
import { SocketService } from './socket.service';
import { AuthenticatedSocket } from './dto/authenticatedSocket.interface';
@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
@UseGuards(WsguardGuard)
@Injectable()
export class ChatGateWay {
  constructor(
    private readonly chatService: ChatService,
    private readonly socketService: SocketService,
  ) {}

  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('register')
  @UseGuards(WsguardGuard)
  register(@ConnectedSocket() client: Partial<AuthenticatedSocket>) {
    const userId = client.user?.id;

    if (userId && client.id) {
      this.socketService.mapUser(userId, client.id);
    }

    console.log(`User ${userId} connected`);

    return {
      message: 'registered',
    };
  }

  @SubscribeMessage('sendMessage')
  @UseGuards(WsguardGuard)
  async sendMessage(
    @ConnectedSocket() client: Partial<AuthenticatedSocket>,
    @MessageBody() payload: any,
  ) {
    const senderId = client.user?.id;
    const receiverId = payload.receiverId;


    if (!receiverId) {
      throw new WsException('recever not found');
    }

    if (senderId) {
      await this.chatService.createMessage(
        { message: payload.message },
        senderId,
        receiverId,
      );
    }
    const findRecever = this.socketService.getClient(receiverId);

    if (findRecever) {
      this.server.to(findRecever).emit('newMessage', payload.message);
    }

    return payload.message;
  }
}
