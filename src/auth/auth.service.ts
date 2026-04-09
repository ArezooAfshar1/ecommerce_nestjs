import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import Role from 'src/users/enums/role';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(mobile: string, password: string, displayName: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({
      mobile,
      password: hashedPassword,
      displayName,
      role: Role.NormalUser,
    });
  }

  async login(mobile: string, password: string) {
    const user = await this.userService.findOneByMobile(mobile);

    if (!user) {
      throw new NotFoundException('کاربر پیدا نشد');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('رمز عبور شما اشتباه است');
    }

    const payload = {
      mobile: user.mobile,
      sub: user.id,
      displayName: user.displayName,
      role: user.role
    };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
    };
  }
}
