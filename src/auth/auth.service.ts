import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import UserRoleEnum from 'src/users/enums/userRoleEnum';
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
      role: UserRoleEnum.NormalUser,
    });
  }

  async login(mobile: string, password: string){
    const user = await this.userService.findOneByMobile(mobile)
    if(!(await bcrypt.compare(password, user.password))){
        throw new UnauthorizedException('رمز عبور شما اشتباه است')
    }

    const payload = {mobile: user.mobile, sub : user.id, displayName: user.displayName}
    const token = this.jwtService.sign(payload);

    return {
        accessToken: token
    }

  }
}
