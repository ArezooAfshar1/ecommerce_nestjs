import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    const address = await this.addressService.create(createAddressDto);
    return {
      statusCode: HttpStatus.CREATED,
      data: address,
      message: 'ادرس با موفقیت ساخته شد',
    };
  }

  @Get()
  async findAll() {
    const addresses = await this.addressService.findAll();

    return {
      statusCode: HttpStatus.OK,
      data: addresses,
      message: 'ادرس با موفقیت دریافت شد',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const address = await this.addressService.findOne(+id);

    return {
      statusCode: HttpStatus.OK,
      data: address,
      message: 'ادرس با موفقیت دریافت شد',
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    const address = await this.addressService.update(+id, updateAddressDto);

    return {
      statusCode: HttpStatus.OK,
      data: address,
      message: 'ادرس با موفقیت اپدیت شد',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.addressService.remove(+id);

    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'ادرس با موفقیت حذف شد',
    };
  }
}
