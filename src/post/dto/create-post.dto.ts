import { Transform } from "class-transformer";
import { IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class CreatePostDto {
    
    @Transform(({value})=>value.trim())
    @IsString()
    @IsOptional()
    @MaxLength(113)
    caption!:string;

}
