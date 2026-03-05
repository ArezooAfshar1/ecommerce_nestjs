import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches, MinLength } from "class-validator";
import { Transform } from "class-transformer";
import UserRoleEnum from "../enums/userRoleEnum";


export class CreateUserDto {
    @IsNotEmpty({message: "موبایل نمیتواند خالی باشد"})
    @IsString({ message: "موبایل باید یک رشته باشد"})
    @Length(11, 11, { message: 'شماره موبایل باید 11 رفم باشد'})
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    mobile: string;

    @IsString({ message: "نام باید یک رشته باشد"})
    @IsNotEmpty({message: "موبایل نمیتواند خالی باشد"})
    displayName: string;

    @IsString({ message: "رمز عبور باید یک رشته باشد"})
    @IsOptional()
    @MinLength(8,{ message: "رمز عبور باید حداقل 8 کاراکتر باشد"})
    password: string;

    @IsEnum(UserRoleEnum, {message: "نقش کاربر باید یکی از مقادیر (admin / user) باشد"})
    @IsOptional()
    role: UserRoleEnum
}
