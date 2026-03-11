import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    const newTicket = await this.ticketsService.create(createTicketDto);
    return {
      statusCode: HttpStatus.OK,
      data: newTicket,
      message: 'تیکت با موفقیت ثبت شد',
    };
  }

  @Get()
  async findAll() {
    const ticket = this.ticketsService.findAll();

    return {
      statusCode: HttpStatus.OK,
      data: ticket,
      message: 'لیست تیکت با موفقیت ثبت شد',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ticket = this.ticketsService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      data: ticket,
      message: 'تیکت با موفقیت دریافت شد',
    };
  }

}
