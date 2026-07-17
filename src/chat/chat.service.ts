import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';;
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { FollowEntity } from 'src/follow/entities/follow.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity) private chatEntity: Repository<ChatEntity>,
    @InjectRepository(FollowEntity)
    private readonly followEntity: Repository<FollowEntity>,
  ) {}

  async createMessage(
    createChatDto: CreateChatDto,
    senderId: string,
    recevierId: string,
  ) {
    const findRelation = await this.followEntity.findOne({
      where: [
        {
          follower: { id: senderId },
          following: { id: recevierId },
        },
        {
          follower: { id: recevierId },
          following: { id: senderId },
        },
      ],
    });

    if (!findRelation) {
      throw new ForbiddenException('You are not connected');
    }

    const createChat =  this.chatEntity.create({
      message: createChatDto.message,
      sender: { id: senderId },
      recevier: { id: recevierId },
    });

    await this.chatEntity.save(createChat);

    return { message: createChat.message };
  }

}
