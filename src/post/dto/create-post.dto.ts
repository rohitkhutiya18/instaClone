import { Transform } from "class-transformer";
import { IsString, IsUrl, MaxLength } from "class-validator";

export class CreatePostDto {
    
    @Transform(({value})=>value.trim())
    @IsString()
    @MaxLength(113)
    caption!:string;

}
