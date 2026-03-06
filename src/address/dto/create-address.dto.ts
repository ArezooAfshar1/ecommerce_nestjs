import { IsString, IsOptional, Length, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {

  @IsNotEmpty({message: "ایدی کاربر نمیتواند خالی باشد"})
  userId: number;

  @IsString({ message: 'استان باید یک رشته باشد' })
  @IsNotEmpty({ message: 'استان نمیتواند خالی باشد' })
  province: string;

  @IsString({ message: 'شهر باید یک رشته باشد' })
  @IsNotEmpty({ message: 'شهر نمیتواند خالی باشد' })
  city: string;

  @IsString()
  @Length(10, 10, { message: 'کد پستی باید 10 رفم باشد' })
  postalCode: string;

  @IsString({ message: 'ادرس باید رشته باشد' })
  @IsNotEmpty({ message: 'ادرس نمیتواند خالی باشد' })
  address: string;

  @IsString({ message: 'شماره موبایل گیزنده باید رشته باشد' })
  @Length(11, 11, { message: 'شماره موبایل گیرنده باید حتما 11 رفم باشد' })
  recieverMobile: string;

  @IsOptional()
  @IsString({ message: 'توضیحات باید یک رشته باشد' })
  description: string;
}
