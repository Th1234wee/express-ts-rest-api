import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn({type : "tinyint"})
    id : number

    @Column({type : "varchar",length : 30,nullable : false,default : ""})
    name : string

    @Column({unique : true})
    email : string

    @Column({unique : true})
    password : string

}