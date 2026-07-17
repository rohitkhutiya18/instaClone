import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.userService.createUser(createUserDto);
  }

  @Get('all')
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('profile',{
      storage:diskStorage({
        destination:"./uploads",
        filename(req, file, callback) {
           const unique = `${randomUUID()}-${extname(file.originalname)}`;
           callback(null,unique)         
        },
      })
    })
  )
  uploads(@UploadedFile() file : Express.Multer.File,@Param('id') id :string){
    return this.userService.uploadFile(file.path,id)
  }


  @Patch('update-pic/:id')
  @UseInterceptors(
    FileInterceptor('newProfilePic',{
      storage:diskStorage({
        destination:'./uploads',
        filename(req, file, callback) {
          const unique = `${randomUUID()}-${extname(file.originalname)}`
          callback(null,unique)
        },
      })
    })
  )
  
  updateProfilePic(@UploadedFile() file : Express.Multer.File, @Param('id') id:string){
             return this.userService.updatePic(file.path,id);
  }

  @Delete('delete-pic/:id')
  deleteProfilePic(@Param('id') id :string){
    return this.userService.deletePic(id);
  }

}
