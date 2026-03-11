import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches, MinLength } from "class-validator";
import { Transform } from "class-transformer";
import UserRoleEnum from "../enums/userRoleEnum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { User } from "../entities/user.entity";


export class CreateUserDto {
    @ApiProperty({ example: '09120000000', description: 'شماره موبایل'})
    @IsNotEmpty({message: "موبایل نمیتواند خالی باشد"})
    @IsString({ message: "موبایل باید یک رشته باشد"})
    @Length(11, 11, { message: 'شماره موبایل باید 11 رفم باشد'})
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    mobile: string;

    @ApiProperty({example: "آرزو", description: 'نام نمایشی'})
    @IsString({ message: "نام باید یک رشته باشد"})
    @IsNotEmpty({message: "موبایل نمیتواند خالی باشد"})
    displayName: string;
    
    @ApiPropertyOptional({example: "12345678", description: 'رمز عبور'})
    @IsString({ message: "رمز عبور باید یک رشته باشد"})
    @IsOptional()
    @MinLength(8,{ message: "رمز عبور باید حداقل 8 کاراکتر باشد"})
    password: string;

    @ApiPropertyOptional({
        enum: UserRoleEnum,
        example: UserRoleEnum.NormalUser,
        description: 'نقش کاربر'})
    @IsEnum(UserRoleEnum, {message: "نقش کاربر باید یکی از مقادیر (admin / user) باشد"})
    @IsOptional()
    role: UserRoleEnum
}
