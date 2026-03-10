import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-items.entity';
import { Product } from 'src/products/entities/product.entity';
import { UsersService } from 'src/users/users.service';
import { AddressService } from 'src/address/address.service';
import { ProductsService } from 'src/products/products.service';
import { orderStatus } from './enums/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly productService: ProductsService,

    private readonly userService: UsersService,
    private readonly addressService: AddressService,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise <void> {
    const user = await this.userService.findOne(createOrderDto.userId);

    const address = await this.addressService.findOne(createOrderDto.addressId);

    const order = this.orderRepository.create({
      user,
      address,
      total_price: createOrderDto.total_price,
      discount_code: createOrderDto.discount_code,
      status: createOrderDto.status || orderStatus.PENDING
    })

    const savedOrder = await this.orderItemRepository.save(order);

    if(createOrderDto.items && createOrderDto.items.length > 0){
      const orderItems = createOrderDto.items.map(async (item)=> {
        const product = await this.productService.findOne(item.productId);

        const orderItem = this.orderItemRepository.create({
          order: savedOrder,
          product
        });
        return this.orderItemRepository.save(orderItem)
      })
      await Promise.all(orderItems)
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({relations: ['user', 'address', 'items', 'items.product']});
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'address', 'items', 'items.pproduct'],
    })
    
    if (!order) {
      throw new NotFoundException('سفارش یافت نشد')
    }
    
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto):Promise <Order>{
    const order = await this.orderRepository.findOne({where : {id}});
    if (!order){
      throw new NotFoundException('سفارش یافت نشد')
    }
    if (updateOrderDto.status) {
      order.status = updateOrderDto.status;
    }
    if (updateOrderDto.discount_code) {
      order.discount_code = updateOrderDto.discount_code;
    }

    if (updateOrderDto.addressId) {
      const address = await this.addressService.findOne(updateOrderDto.addressId)
      if(!address){
        throw new NotFoundException('ادرس یافت نشد')
      }
      order.address = address;
    }
    return order
  }

 async remove(id: number): Promise<void> {
    const order = await this.orderRepository.findOne({ where: {id}});
    if (!order){
      throw new NotFoundException('سفارش یافت نشد')
    }
  }
}
