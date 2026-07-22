import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaveDto } from './dto/create-save.dto';
import { UpdateSaveDto } from './dto/update-save.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveEntity } from './entities/save.entity';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/post/entities/post.entity';

@Injectable()
export class SaveService {

  constructor(@InjectRepository(SaveEntity) private saveEntity : Repository<SaveEntity>,
          @InjectRepository(PostEntity) private postEntity : Repository<PostEntity>){}

  async create(createSaveDto: CreateSaveDto) {
    const findPost = await this.postEntity.findOne({where:{id:createSaveDto.postId}});
    
    if(!findPost){
      throw new NotFoundException('Post not found');
    }

    const createSavePost = await this.saveEntity.create({
      post:{
        id:createSaveDto.postId
      },
      user:{id:createSaveDto.userId}
    })

    return this.saveEntity.save(createSavePost)


  }

  findAll() {
    return `This action returns all save`;
  }

  async findOne(userId: string) {
      const findSavePosts = await this.saveEntity.find({where:{user:{id:userId}},relations:{user:true}});
      
      if(findSavePosts.length === 0){
        throw new NotFoundException("not saved post found")
      }

      const findAllPosts : PostEntity[] = []

      for(let save of findSavePosts){
        const postId = save.post.id
        const res = await this.postEntity.findOne({where:{id:postId}});

        if(res){findAllPosts.push}
      }

      return findAllPosts;
      
  }

  async remove(savePostId:string,userId: string) {
    const findSavePost = await this.saveEntity.findOne({where:{id:savePostId},relations:{user:true}});

    if(!findSavePost){
      throw new NotFoundException("Post not found");
    }

    if(findSavePost.user.id !== userId){
      throw new ForbiddenException("forbidden")
    }

    await this.saveEntity.remove(findSavePost);
    return {message:"remove successfully"}

    

  }
}
