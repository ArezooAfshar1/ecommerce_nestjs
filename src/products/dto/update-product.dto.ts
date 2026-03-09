import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  price;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  stock: number;

  @IsOptional()
  @IsArray()
  categoryIds?: number[];
}
