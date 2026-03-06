import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity("tickets")
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    subject: string;

    @Column()
    description: string;

    @ManyToOne(()=> User, (user)=> user.tickets)
    user: User;

    @ManyToOne(()=> Ticket, (ticket)=> ticket.replies,{nullable: true})
    replyTto: Ticket;

    @OneToMany(()=> Ticket, (ticket)=> ticket.replyTto)
    replies: Ticket[];
}
