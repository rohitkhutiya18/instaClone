import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatEntity {
    @PrimaryGeneratedColumn('uuid')
    id!:string

    @ManyToOne(()=>UserEntity,{onDelete:"CASCADE"})
    @JoinColumn({name:"sender"})
    sender!:UserEntity

    @ManyToOne(()=>UserEntity,{onDelete:"CASCADE"})
    @JoinColumn({name:'recevier'})
    recevier!:UserEntity

    @Column()
    message!:string

    @CreateDateColumn()
    createdAt!:Date
}
