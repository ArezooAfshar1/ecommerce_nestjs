import { IsString, IsOptional, Length, IsNotEmpty } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'موضوع نمیتواند خالی باشد' })
  @IsString({ message: 'موضوع باید رشته باشد' })
  subject: string;

  @IsOptional()
  @IsString({ message: 'توضیحات باید یک رشته باشد' })
  description: string;

  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  userId: number;

  @IsOptional()
  replyTo: number;
}
