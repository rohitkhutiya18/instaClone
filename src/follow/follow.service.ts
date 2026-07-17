import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowEntity } from './entities/follow.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowService {
  constructor(@InjectRepository(FollowEntity) private readonly followEntity : Repository<FollowEntity>){}

  async followUser(follower:string,following:string){
    if(follower === following){
      throw new BadRequestException("you cant follow yourself")
    }

    const exist = await this.followEntity.findOne({
      where:{
        follower:{id:follower},
        following:{id:following}
      }
    })

    if(exist){
      throw new ConflictException("already followed")
    }

       const addFollower =  this.followEntity.create({
        follower:{
           id:follower
        },
        following:{
          id:following
        },
       })

       await this.followEntity.save(addFollower) 
       return {message:'User Follow successfully'}
  }

  async unFollowUser(follower:string,following:string){
        const findColumn = await this.followEntity.findOne({where:{
           follower:{
           id:follower
        },
        following:{
          id:following
        },
        }
        })
          
        if(!findColumn){
          throw new NotFoundException("Follow relationship not found")
        }
        
        await this.followEntity.remove(findColumn) 
        return {message:'User unfollow successfully'}
  }
  

}
