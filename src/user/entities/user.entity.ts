import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import bcrypt from 'bcrypt'
import { CreateDateColumn } from "typeorm/browser";
@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column({nullable:false,comment:"userName is required"})
    userName!:string;

    @Column({unique:true,nullable:false})
    email!:string;

    @Column()
     password!:string

     @BeforeInsert()
     async hashPassword(){
        return this.password = await bcrypt.hash(this.password,10);
     }

     

     @Column({nullable:true,default:""})
     bio?:string;
    
     @Column({nullable:true,default:""})
     profilePic?:string

       @Column({nullable:true,default:""})
     refreshToken?:string;
    

     @CreateDateColumn()
     createdAt!:Date

     @UpdateDateColumn()
     updatedAt!:Date
}
