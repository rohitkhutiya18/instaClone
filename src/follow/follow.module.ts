import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowEntity } from './entities/follow.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FollowEntity])],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
