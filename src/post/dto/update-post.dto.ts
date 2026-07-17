import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsString()
    postId!:string

     @IsString()
     @IsOptional()
     caption!:string

}
