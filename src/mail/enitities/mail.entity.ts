import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class mailEntity {
     @PrimaryGeneratedColumn('uuid')
     id!:string;

     @Column({nullable:false})
     email!:string

     @Column()
     otp!:number;

     @Column({type:'timestamp'})
     expiresAt!:Date

     @CreateDateColumn()
     createAt!:Date
}