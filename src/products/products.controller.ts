import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return {
      statusCode: HttpStatus.OK,
      data: product,
      message: 'محصول با موفقیت ساخته شد',
    };
  }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: products,
      message: 'محصولات با موفقیت دریافت شد',
    };
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);

    return {
      statusCode: HttpStatus.OK,
      data: product,
      message: 'محصول با موفقیت دریافت شد',
    };
  }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
      const product = await this.productsService.update(+id, updateProductDto);
  
      return {
        statusCode: HttpStatus.OK,
        data: product,
        message: 'محصول با موفقیت اپدیت شد',
      };
    }

    
}
