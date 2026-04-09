import { IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import Role from "../enums/role";

export class UpdateUserDto{
    @IsString({ message: "نام باید یک رشته باشد"})
    @IsNotEmpty({message: "موبایل نمیتواند خالی باشد"})
    displayName: string;

    @IsEnum(Role, {message: "نقش کاربر باید یکی از مقادیر (admin / user) باشد"})
    @IsOptional()
    role: Role
}