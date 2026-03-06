import {
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString({ message: 'نام باید یک رشته باشد' })
  @IsNotEmpty({ message: 'موبایل نمیتواند خالی باشد' })
  displayName: string;

  @IsString({ message: 'موبایل باید یک رشته باشد' })
  @IsNotEmpty({ message: 'موبایل نمیتواند خالی باشد' })
  @Length(11, 11, { message: 'شماره موبایل باید 11 رقم باشد' })
  @Transform(({ value }) => value.trim())
  mobile: string;

  @IsString({ message: 'رمز عبور باید یک رشته باشد' })
  @IsNotEmpty({ message: 'رمز عبور نمیتواند خالی باشد' })
  @MaxLength(16, { message: 'رمز عبور باید حداکثر 16 کاراکتر باشد' })
  //@MinLength(8, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' }) //comment for develop mode
  password: string;
}
