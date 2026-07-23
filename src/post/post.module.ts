import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CloudnaryModule } from 'src/cloudnary/cloudnary.module';
import { LikeEntity } from 'src/like/entities/like.entity';
import { SaveEntity } from 'src/save/entities/save.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PostEntity,LikeEntity,SaveEntity,CommentEntity,UserEntity]),CloudnaryModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
