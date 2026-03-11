import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Res,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserRoleEnum from './enums/userRoleEnum';
import { Response } from 'express';
import { ApiExcludeEndpoint, ApiExcludeController, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGaurd } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Users - مدیریت کاربران')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @ApiOperation({ summary: "ایجاد کاربر جدید"})
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createUser = await this.usersService.create(createUserDto);

    return {
      statusCode: HttpStatus.CREATED,
      data: createUser,
      message: 'کاربر با موفقیت ساخته شد',
    };
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('role') role?: UserRoleEnum,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const users = await this.usersService.findAll(role, limit, page);

    return {
      statusCode: HttpStatus.OK,
      data: users,
      message: 'کاربر با موفقیت دریافت شد',
    };
  }

  @UseGuards(JwtAuthGaurd)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      data: user,
      message: 'کاربر با موفقیت دریافت شد',
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);

    return {
      statusCode: HttpStatus.OK,
      data: user,
      message: 'کاربر با موفقیت اپدیت',
    };
  }

  //@ApiExcludeEndpoint() // delete endpoint from swagger doc
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);

    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'کاربر با موفقیت حذف شد',
    };
  }
}
