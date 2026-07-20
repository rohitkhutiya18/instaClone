import { PostEntity } from "src/post/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @ManyToOne(()=>PostEntity,{
        onDelete:'CASCADE'
    })
    @JoinColumn({name:'postId'})
    post!:PostEntity

    @ManyToOne(()=>UserEntity,{
        onDelete:'CASCADE'
    })
    @JoinColumn({name:'userId'})
    user!:UserEntity

    @Column()
    comment!:string

    @ManyToOne(()=>CommentEntity,{
        onDelete:"CASCADE",
        nullable:true
    })
    @JoinColumn({name:'parentComment'})
    parentComment!:CommentEntity

    @CreateDateColumn()
    createdAt!:Date
}
