import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
    constructor(@InjectRepository(UserEntity) private userEntity : Repository<UserEntity>,
@InjectRepository(PostEntity) private PostEntity : Repository<PostEntity>){}

  async searchOperation(search:string){

      const [users,posts] = await Promise.all ([
        this.userEntity.
        createQueryBuilder('user')
        .where('user.userName Like :search' ,{search:`%${search}%`})
        .getMany(),
    
        this.PostEntity.
        createQueryBuilder('post')
        .where('post.caption Like :search' ,{search:`%${search}%`})
        .getMany(),
    ])

      return [users,posts]
    }


}
