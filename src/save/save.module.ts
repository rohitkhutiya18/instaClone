import { Module } from '@nestjs/common';
import { SaveService } from './save.service';
import { SaveController } from './save.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { SaveEntity } from './entities/save.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,PostEntity,SaveEntity])],
  controllers: [SaveController],
  providers: [SaveService],
})
export class SaveModule {}
