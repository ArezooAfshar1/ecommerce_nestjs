import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    
    const category = await this.categoriesService.create(createCategoryDto);

        return {
          statusCode: HttpStatus.OK,
          data: category,
          message: 'دسته بندی با موفقیت ساخته شد',
        };
  }

  @Get()
  async findAll() {
    const category = await this.categoriesService.findAll();

        return {
          statusCode: HttpStatus.OK,
          data: category,
          message: 'دسته بندی ها با موفقیت دریافت شد',
        };
  }
}
