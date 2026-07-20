import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mailEntity } from './enitities/mail.entity';
import { RegisteredUserEntity } from 'src/user/entities/RegisteredUser.entity';

@Module({
  imports:[TypeOrmModule.forFeature([mailEntity,RegisteredUserEntity])],
  providers: [MailService],
  exports:[MailService]
})
export class MailModule {}
