import { PostEntity } from "src/post/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SaveEntity {
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @ManyToOne(()=>PostEntity)
    post!:PostEntity

    @ManyToOne(()=>UserEntity)
    user!:UserEntity

    @CreateDateColumn()
    createdAt!:Date
}
