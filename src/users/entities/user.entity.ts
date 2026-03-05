import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import UserRoleEnum from '../enums/userRoleEnum';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true})
    mobile: string;
  
    @Column({ nullable: false, name: "display_name"})
    displayName: string;
  
    @Column()
    password: string;
    
    @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.NormalUser })
    role: UserRoleEnum;

    @CreateDateColumn({ name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at"})
    updatedAt: Date
}
