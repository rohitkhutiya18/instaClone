import { Transform } from "class-transformer";
import { IsString } from "class-validator";

export class CreateSaveDto {
    @Transform(({value})=>value.trim())
    @IsString()
    postId!:string;

    @IsString()
    userId!:string
}
