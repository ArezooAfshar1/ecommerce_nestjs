import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";


@Entity('addreses')
export class Address {
    @PrimaryColumn()
    id:number;

    @Column({nullable: false})
    province: string;


    @Column({nullable: false})
    city: string;

    @Column({nullable: false})
    address: string;


    @Column({name: "postal_code", length: 10})
    potalCode: string;

    @Column({ name: "reciever_mobile", length:11})
    receiverMobile: string;

    @Column({nullable:true})
    description: string;

    @ManyToOne(()=> User, (user)=> user.addresses)
    user: User;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date;
}
