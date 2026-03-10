import { IsNumber, IsNotEmpty } from 'class-validator';

export class VerifyPayment {
  @IsNumber()
  @IsNotEmpty({ message: 'کد تراکنش نمی تواند خالی باشد' })
  trackId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'ایدی سفارش شما نمی تواند خالی باشد' })
  orderId: number;
}
