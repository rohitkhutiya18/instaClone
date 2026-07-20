import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) private commentEntity : Repository<CommentEntity>,
@InjectRepository(UserEntity) private userEntity : Repository<UserEntity>,
@InjectRepository(PostEntity) private postEntity : Repository<PostEntity>){}

  async create(createCommentDto: CreateCommentDto,userId:string) {
      const user = await this.userEntity.findOne({where:{id:userId}})

      if(!user){throw new NotFoundException('User not Found')}

       const post = await this.postEntity.findOne({where:{id:userId}})

      if(!post){throw new NotFoundException('post not Found')}

       
      const createComment = this.commentEntity.create({
        comment:createCommentDto.comment,
        post:{id:createCommentDto.postId},
        user:{id:userId}
      })

      if(createCommentDto.parentComment){
        const parentCommentId ={id: createCommentDto.parentComment}
        createComment.parentComment = {...parentCommentId} as CommentEntity
      }

      const comment = await this.commentEntity.save(createComment)
      return comment;

  }

  findAll(postId:string) {
    return this.commentEntity.find({where:{post:{id:postId}},relations:{post:true}});
  }

 async update(updateCommentDto: UpdateCommentDto,userId:string) {
      const comment = await this.commentEntity.findOne({where:{id:updateCommentDto.commentId},
        relations:{user:true,post:true}})
      
      if(!comment){
        throw new NotFoundException("Comment Not Found");
      }

      if(comment.user.id !== userId ){
        throw new ForbiddenException('Forbidden');
      }

      if(updateCommentDto.comment){
        comment.comment = updateCommentDto.comment
      }

      await this.commentEntity.save(comment)
      return comment;
  }

  async remove(id: string,userId:string) {
   const comment = await this.commentEntity.findOne({where:{id},relations:{user:true}})
      
      if(!comment){
        throw new NotFoundException("Comment Not Found");
      }

      if(comment.user.id !== userId ){
        throw new ForbiddenException('Forbidden');
      }

      await this.commentEntity.delete(comment)
      return {message:"Delete Comment SuccessFully"}
  }
}
