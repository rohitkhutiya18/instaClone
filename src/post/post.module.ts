import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CloudnaryModule } from 'src/cloudnary/cloudnary.module';

@Module({
  imports:[TypeOrmModule.forFeature([PostEntity]),CloudnaryModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
