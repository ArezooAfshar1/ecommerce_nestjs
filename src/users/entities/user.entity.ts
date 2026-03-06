import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import UserRoleEnum from '../enums/userRoleEnum';
import { Address } from 'src/address/entities/address.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity'; 

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true})
    mobile: string;
  
    @Column({ nullable: false, name: "display_name"})
    displayName: string;
  
    @Column({ nullable: true })
    password: string;
    
    @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.NormalUser })
    role: UserRoleEnum;
    
    @OneToMany(()=> Address, (address)=> address.user)
    addresses: Address[];

    @OneToMany(()=> Ticket, (ticket)=> ticket.user)
    tickets: Ticket[];

    @CreateDateColumn({ name: "created_at", type: 'timestamp'}) // بصورت خودکار مقدار دهی میشه
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: 'timestamp'}) // بصورت خودکار مقدار دهی میشه
    updatedAt: Date
}
