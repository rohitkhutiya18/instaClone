import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CreateDateColumn } from "typeorm/browser";
@Entity()
export class RegisteredUserEntity {
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column()
    email!:string

     @CreateDateColumn()
     createdAt!:Date

     @UpdateDateColumn()
     updatedAt!:Date
}
