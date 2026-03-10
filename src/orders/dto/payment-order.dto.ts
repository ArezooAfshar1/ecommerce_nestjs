import { IsNumber, IsNotEmpty } from "class-validator";

export class PaymentOrderDto {

    @IsNumber()
    @IsNotEmpty({ message: 'ایدی سفارش شما نمی تواند خالی باشد' })
    orderId: number;
}