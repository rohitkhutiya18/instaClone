import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostEntity } from 'src/post/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,PostEntity])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
