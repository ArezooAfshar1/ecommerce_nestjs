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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
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

  @Delete('remove-only-category/:id')
  async removeOnleCategory(@Param('id') id: string) {
    await this.categoriesService.removeOnlyCategory(+id);

    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'دسته بندی با موفقیت حذف شد',
    };
  }

    @Delete('safe-remove/:id')
  async safeRemove(@Param('id') id: string) {
    await this.categoriesService.safeRemove(+id);

    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'دسته بندی با موفقیت حذف شد',
    };
  }

    @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(+id);

    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'دسته بندی با موفقیت حذف شد',
    };
  }
}
