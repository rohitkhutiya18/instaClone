import { Transform } from "class-transformer";
import { IsEmail, isNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginDTO {
    @Transform(({value})=>value.trim())
    @IsString()
    @IsEmail()
    email!:string

    @IsString()
    @MaxLength(8)
    password!:string
}