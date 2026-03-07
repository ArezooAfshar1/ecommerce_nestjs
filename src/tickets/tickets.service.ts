import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly userService: UsersService,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { userId, replyTo, ...TicketData } = createTicketDto;
    const user = await this.userService.findOne(userId);

    let replyToTicket: any = null;
    if (replyTo) {
      replyToTicket = await this.ticketRepository.findOne({
        where: { id: replyTo },
        relations: ['replyTo'],
      });
      if (replyToTicket.replyTo) {
        throw new BadRequestException('شما نمیتوانید این تیکت را ریپلای کنید');
      }
    }
    const ticket = this.ticketRepository.create({
      ...TicketData,
      user,
      replyTto: replyToTicket,
    });

    return this.ticketRepository.create(ticket);
  }

  async findAll() {
    const tickets = await this.ticketRepository
      .createQueryBuilder('tickets')
      .where('tickets.replyToId IS NULL')
      .getMany();

    return tickets;
  }

  async findOne(id: number){
    const ticket = await this.ticketRepository.findOneOrFail({where: {id}, relations: ['replies']});
    return ticket
  }
}
