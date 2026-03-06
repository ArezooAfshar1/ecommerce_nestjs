import { IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import UserRoleEnum from "../enums/userRoleEnum";

export class UpdateUserDto{
    @IsString({ message: "نام باید یک رشته باشد"})
    @IsNotEmpty({message: "موبایل نمیتواند خالی باشد"})
    displayName: string;

    @IsEnum(UserRoleEnum, {message: "نقش کاربر باید یکی از مقادیر (admin / user) باشد"})
    @IsOptional()
    role: UserRoleEnum
}