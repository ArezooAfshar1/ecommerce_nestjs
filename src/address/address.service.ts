import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    const { userId, ...AddressData} = createAddressDto;
    const user = await this.UserRepository.findOneByOrFail({ id: userId });
    const address = this.addressRepository.create({
      ...AddressData,
      user,
    });
    return this.addressRepository.create(address);
  }

  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!address) throw new NotFoundException('ادرس پیدا نشد');
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto):Promise<Address> {
    const address = await this.findOne(id)
    Object.assign(address, updateAddressDto)
    return await this.addressRepository.save(address)
  }

  async remove(id: number): Promise<void> {
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
  }
}
