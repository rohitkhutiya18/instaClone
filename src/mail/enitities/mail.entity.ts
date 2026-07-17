import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class mailEntity {
     @PrimaryGeneratedColumn('uuid')
     id!:string;

     @Column({nullable:false})
     email!:string

     @Column()
     otp!:number;
}