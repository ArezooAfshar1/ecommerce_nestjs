import { IsNumber, IsOptional, IsEnum, IsDateString, IsArray, ValidateNested, IsString } from 'class-validator';
import { orderStatus } from '../enums/order-status.enum';
import { CreateOrderItemDto } from './create-order-item.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNumber({}, { message: 'شناسه کاربر باید یک عدد باشد' })
  userId: number;

  @IsEnum(orderStatus, { message: 'وضعیت سفارش باید یکی از مقادیر معتبر باشد' })
  @IsOptional()
  status?: orderStatus;

  @IsDateString({}, { message: 'زمان پرداخت باید یک تاریخ معتبر باشد' })
  @IsOptional()
  payed_time?: Date;

  @IsNumber({}, { message: 'شناسه ادرس باید یک عدد باشد' })
  addressId: number;

  @IsString({ message: 'کد تخفیف باید یک رشته باشد' })
  @IsOptional()
  discount_code?: string;

  @IsArray({message: 'ایتم های سفارش به صورت ارایه ارسال شوند'})
  @ValidateNested({ each: true})
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
