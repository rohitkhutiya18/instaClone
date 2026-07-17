import { Transform } from "class-transformer";
import { IsEmail, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @Transform(({value})=>value.trim())
        @IsString()
        userName!:string;
    
        @IsString()
        // @IsEmail()
        email!:string;
    
        @IsString()
        @MinLength(4)
        @MaxLength(8)
         password!:string
    
         @IsString()
         @IsOptional()
         @MaxLength(113)
         bio?:string;
        
        @IsString()
         @IsOptional()
         @IsUrl()
         profilePic?:string

}
