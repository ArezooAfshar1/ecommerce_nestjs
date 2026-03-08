import { IsString, IsInt, IsOptional, IsArray } from "class-validator";

export class CreateProductDto {
    @IsString()
    title: string;

    @IsInt()
    price;

    @IsString()
    description: string;

    @IsInt()
    stovk: number;

    @IsOptional()
    @IsArray()
    categoryIds?: number;
}
