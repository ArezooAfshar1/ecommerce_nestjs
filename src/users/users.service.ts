import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import UserRoleEnum from './enums/userRoleEnum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const alreadyUser = await this.findOneByMobile(createUserDto.mobile, true)
    if (alreadyUser){
      throw new BadRequestException("کاربری با این شماره موبایل وجود دارد")
    }
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(role?: UserRoleEnum, limit: number = 10, page: number = 1) {
    const query = this.userRepository.createQueryBuilder('users');

    if (role) {
      query.where('role = :role', { role });
    }

    query.skip((page - 1) * limit).take(limit);

    return await query.getMany();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`کاربر ${id} پیدا نشد`);
    return user;
  }

  async findOneByMobile(mobile: string, checkExist: boolean =false): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ mobile });

    if (!checkExist){
      if (!user) throw new NotFoundException(`کاربر ${mobile} پیدا نشد`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const updateUser = await this.userRepository.update(id, {
      displayName: updateUserDto.displayName,
      role: updateUserDto.role,
    });
    return await this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException('این کاربر پیدا نشد');
  }
}
