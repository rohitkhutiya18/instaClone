import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(['follower','following'],{unique:true})
export class FollowEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id!:string


    @ManyToOne(()=>UserEntity,{
        onDelete:"CASCADE"
    })
    @JoinColumn({name:'followerId'})
    follower!:UserEntity

    @ManyToOne(()=>UserEntity,{
        onDelete:"CASCADE"
    })
    @JoinColumn({name:'followingId'})
    following!:UserEntity

    @CreateDateColumn()
    createdAt!:Date

    
}
