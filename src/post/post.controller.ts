import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req, UploadedFiles, Query, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { type Request } from 'express';
import { JwtGaurd } from 'src/auth/auth.gaurd';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
   
  // create post 
  @UseGuards(JwtGaurd)
  @Post('create')
  @UseInterceptors(
    FilesInterceptor('postImages',3,{
      storage:diskStorage({
        destination:'./uploads',
        filename:(req,file,cb)=>{
          const unquie = `${randomUUID()}-${extname(file.originalname)}`;
          cb(null,unquie);
        }
      })
    })
  ) 

  create(@Req() req:Request, 
    @Body() body : CreatePostDto,
         @UploadedFiles() files: Express.Multer.File[]) {
          const urlArr = files.map((val)=>val.path)
          const user = req.user as any
    return this.postService.create(user.id,body,urlArr);
  }



  // update post 
  @Patch('update-post')
  @UseGuards(JwtGaurd)
  updatePost(@Body() updatePostDto: UpdatePostDto,@Req() req : Request) {
    const user = req.user as any
     return this.postService.updatePost( updatePostDto,user.id);
  }



  // get post
  @Get('user-all-post/:id')
  findAllPostOfuser(@Param('id') id: string) {
    return this.postService.findAllPostOfUser(id);
  }



  // delete post
  @UseGuards(JwtGaurd)
  @Delete('delete-post')
  deletePost(@Body() body:{id:string},@Req() req : Request){
           const user = req.user as any
        
           return this.postService.removePost(body.id,user.id);
  }

  // delete post Image
    @Delete('remove-post-img')
  @UseGuards(JwtGaurd)
  removePostImage(@Body() body:{imageId:string}) {
    return this.postService.removePostImage(body.imageId);
  }

  @Patch('update-post-image')
  @UseGuards(JwtGaurd)
  @UseInterceptors(
    FileInterceptor('updatePostImage',{
      storage:diskStorage({
        destination:'./uploads',
        filename:(req,file,cb)=>{
          const unquie = `${randomUUID()}-${extname(file.originalname)}`;
          cb(null,unquie);
        }
      })
    })
  )
  
  updatePostImage(@Body() body:{postId:string,oldImgId:string},@Req() req:Request,@UploadedFile() file:Express.Multer.File){
     const user = req.user as any    
    return this.postService.updateImage(body.postId,user.id,body.oldImgId,file.path);
  }
  
}
