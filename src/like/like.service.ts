import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from './entities/like.entity';
@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity) private likeEntity: Repository<LikeEntity>,
  ) {}

  async createAndDelete(createLikeDto: CreateLikeDto, userId: string) {
    const findLike = await this.likeEntity.findOne({
      where: {
        user: { id: userId },
        post: { id: createLikeDto.postId },
      },
      relations: { post: true, user: true },
    });

    if (findLike) {
      const removeLike = await this.likeEntity.remove(findLike);
      return removeLike;
    }

    const createLike = this.likeEntity.create({
      user: { id: userId },
      post: { id: createLikeDto.postId },
    });

    return this.likeEntity.save(createLike);
  }
}
