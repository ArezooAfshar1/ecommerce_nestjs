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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaymentOrderDto } from './dto/payment-order.dto';
import { VerifyPayment } from './dto/verify-payment.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);

    return {
      statusCode: HttpStatus.OK,
      data: order,
      message: 'سفارش با موفقیت ثبت شد',
    };
  }

  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll();

    return {
      statusCode: HttpStatus.OK,
      data: orders,
      message: 'سفارش ها با موفقیت دریافت شدند',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(+id);

    return {
      statusCode: HttpStatus.OK,
      data: order,
      message: 'سفارش با موفقیت دریافت شد',
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const order = await this.ordersService.update(+id, updateOrderDto);

    return {
      statusCode: HttpStatus.OK,
      data: order,
      message: 'سفارش با موفقیت اپدیت شد',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const order = this.ordersService.remove(+id);

    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'سفارش با موفقیت حذف شد',
    };
  }

  @Post('/start-payment')
  async startPayment(@Body() paymentOrderDto: PaymentOrderDto) {
    const responsePay = await this.ordersService.startPayment(
      paymentOrderDto.orderId,
    );

    return {
      statusCode: HttpStatus.OK,
      data: {
        ...responsePay,
        payment_url: `https://gateway.zibal.ir/start/${responsePay.trackId}`,
      },
      message: 'لینک پرداخت با موفقیت ساخته شد',
    };
  }

  @Post('/verify-payment')
  async verifyPayment(@Body() verifyPayment: VerifyPayment) {
    const responsePay = await this.ordersService.verifyPayment(
      verifyPayment.trackId,
      verifyPayment.orderId
    );

    return {
      statusCode: HttpStatus.OK,
      data: responsePay,
      message: 'تراکنش با موفقیت پردازش شد',
    };
  }
}
