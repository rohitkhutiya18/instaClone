import { PostEntity } from "src/post/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JoinColumn } from "typeorm/browser";

@Entity()
export class LikeEntity {
    @PrimaryGeneratedColumn('uuid')
    id!:string

    @ManyToOne(()=>UserEntity,{
        onDelete:'CASCADE'
    })
    @JoinColumn({name:'userId'})
    user!:UserEntity

    @ManyToOne(()=>PostEntity,{
        onDelete:'CASCADE'
    })
    @JoinColumn({name:'postId'})
    post!:PostEntity

    @CreateDateColumn()
    createdAt!:Date
}
