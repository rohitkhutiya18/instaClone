import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
      @Transform(({value})=>value.trim())
        @IsString()
        @IsNotEmpty()
        commentId!:string
    
        @IsString()
        @IsNotEmpty()
        @MaxLength(113)
        comment!:string
}
