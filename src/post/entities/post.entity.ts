import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn('uuid')
    id!:string

    @ManyToOne(()=>UserEntity)
    @JoinColumn({name:"userId"})
    user!:UserEntity
    
    @Column()
    caption!:string

    @Column({type: 'jsonb',
  nullable: true,
})
images!: {
  url: string;
  publicId: string;
}[];

    @CreateDateColumn()
    createdAt!:Date

    @UpdateDateColumn()
    updatedAt!:Date


}
