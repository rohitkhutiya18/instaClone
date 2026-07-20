import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {promises as fs} from 'fs'
import { CloudnaryService } from 'src/cloudnary/cloudnary.service';
import { find, toArray } from 'rxjs';
import { RegisteredUserEntity } from './entities/RegisteredUser.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
  @InjectRepository(RegisteredUserEntity) private registeredUserEntity: Repository<RegisteredUserEntity>,
              private readonly cloudnaryService : CloudnaryService){}

  async createUser(createUserDto: CreateUserDto) {
  
    const findEmail = await this.registeredUserEntity.findOne({where:{email:createUserDto.email}})

    if(!findEmail){
       throw new NotAcceptableException("your email is not verified");
    }

    const findUser = await this.userEntity.findOne({where:{email:createUserDto.email}})

    if(findUser){
      throw new NotAcceptableException("you already have registered account");
    }

    const createUser = this.userEntity.create(createUserDto)

    return this.userEntity.save(createUser);
  }

  async findAllUsers() {
    return  this.userEntity.find()
  }

  async findById(id: string) {
  const user = await this.userEntity.findOne({where:{id}})

    if(!user){
      throw new NotFoundException("user Not Found")
    }

    return user;
  }

  async findByEmail(email:string){
    const user = await this.userEntity.findOne({where:{email:email}});

    if(!user){
      throw new NotFoundException("user Not Found with this email")
    }

    return user;
  }

   async saveUser(UserData:CreateUserDto){
    return await this.userEntity.save(UserData);
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>) {
     const user = await this.userEntity.findOne({where:{id}});

    if(!user){
      throw new NotFoundException("user Not Found")
    }
    
    Object.assign(user,updateUserDto);
    return this.userEntity.save(user);
  }

  
    async uploadFile(imgUrl:string,id:string){
        const user = await this.findById(id);
        const cloudImgUrl = await this.cloudnaryService.uploadImageInCloud(imgUrl)
        user.profilePic = cloudImgUrl.secure_url;

        return this.userEntity.save(user);

    }

    async updatePic(imgUrl:string,id:string) {
      const user = await this.findById(id)

      if(!user){
        throw new  NotFoundException("user not found");
      }

     if(user.profilePic){
      try{
        await fs.unlink(user.profilePic);
      }catch{}
     }

    //  const deleteImg = await this.cloudnaryService.deleteImageInCloud(user?.profilePic);
     return this.userEntity.save(user);

    }

    async deletePic(id:string){
      const user = await this.findById(id)

      if(user?.profilePic){
        try {
         await  fs.unlink(user.profilePic)
        } catch{}
      }

      user.profilePic = ''

      await this.userEntity.save(user);

      return {message:"image deleation successfull"}
    }

  

}
