import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCommentDto {
    @Transform(({value})=>value.trim())
    @IsString()
    @IsNotEmpty()
    postId!:string

    @IsString()
    @IsNotEmpty()
    @MaxLength(113)
    comment!:string

    @IsString()
    @IsOptional()
    parentComment?:string

}
