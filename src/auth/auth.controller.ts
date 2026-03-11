import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';

@Public()
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const register = await this.authservice.register(
      registerDto.mobile,
      registerDto.displayName,
      registerDto.password,
    );

    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'کاربر با موفقیت ثبت نام کرد',
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const login = await this.authservice.login(loginDto.mobile, loginDto.password);
    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'کاربر با موفقیت وارد شد',
    };
  }
}
