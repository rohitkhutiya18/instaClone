import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CloudnaryService } from 'src/cloudnary/cloudnary.service';
import { promises as fs} from 'fs';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectRepository(PostEntity) private postEntity : Repository<PostEntity>,
               private readonly cloudnaryService : CloudnaryService){}
 
  
  async create(userId:string,createPostDto:CreatePostDto,files:string[]) {

    const addInCloud = await Promise.all(files.map(async(val)=>{
     try {
       const result = await this.cloudnaryService.uploadImageInCloud(val)
         return result;
     } finally {
       await fs.unlink(val).catch(()=>{});
     } 
    }));
      
    const imgUrl = addInCloud.map((val)=>{
       return {url:val.secure_url,publicId:val.public_id} })

    const newPost = this.postEntity.create({
          caption:createPostDto.caption,
          images:imgUrl,
          user:{
            id:userId
          }
        })


        await this.postEntity.save(newPost);
                     return newPost;
  }


  async updatePost(updatePostDto : Partial<UpdatePostDto>,userId:string){
    console.log(updatePostDto)
       const post = await this.postEntity.findOne({where:{id:updatePostDto.postId},relations:{user:true}})
       console.log(post)

       if(!post){throw new NotFoundException("Post Not Found")}

       if(post.user.id !== userId){throw new ForbiddenException("forbidden")}

       if(updatePostDto.caption !== undefined){
        post.caption = updatePostDto.caption
       }

       return this.postEntity.save(post);
  }


  findAll(page:number,limit:number) {
        return this.postEntity.find({
          skip : (page - 1) * limit,
          take:limit,
        })
  }

 async findAllPostOfUser(id: string) {
    const findPost = await this.postEntity.find({where:{user:{id:id}},relations:{user:true}});

    if(!findPost){
      throw new NotFoundException("no post found out")
    }

    return findPost;
  }


 async removePost(postId:string,userId:string){
     const post = await this.postEntity.findOne({where:{id:postId},  relations: {
        user: true,
    },})
    
     if(!post){
      throw new NotFoundException("post not found");
     }

     if(post.user.id !== userId){
      throw new ForbiddenException("you are not authorized to remove image");
     }

       await Promise.all(
       post.images.map(async(val)=> { return this.cloudnaryService.deleteImageInCloud(val.publicId)}))

      return this.postEntity.remove(post);
  }


  async updateImage(postId:string,userId:string,oldImgPublicId:string,newImgUrl:string){
       const post = await this.postEntity.findOne({where:{id:postId},relations:{user:true}})
       console.log("post")
       if(!post){throw new NotFoundException("post not found")}

       if(post.user.id !== userId){throw new ForbiddenException("forbidden")}
  
       const newImage = await this.cloudnaryService.uploadImageInCloud(newImgUrl)
       await fs.unlink(newImgUrl)

       const index = post.images.findIndex((val)=>val.publicId === oldImgPublicId);
       console.log(index)
       
       if(index === -1){throw new NotFoundException("image not found")}

       post.images[index] = {
        url : newImage.secure_url,
        publicId:newImage.public_id
       }

       console.log(post.images[index])
          await this.cloudnaryService.deleteImageInCloud(oldImgPublicId);
       
       return this.postEntity.save(post)
  }


 async removePostImage(publicId: string,postId:string,userId:string) {
     const findPost = await this.postEntity.findOne({where:{id:postId},relations:{user:true}});
  
     if(findPost?.user.id !== userId){
      throw new ForbiddenException("forbidden")
     }

    const result = await this.cloudnaryService.deleteImageInCloud(publicId)
  console.log(result)
    findPost.images = findPost.images.filter((val)=>val.publicId != publicId);

    return this.postEntity.save(findPost);
  }

}
