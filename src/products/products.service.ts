import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepositry: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepositry: Repository<Category>
  ){}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { title, price, description, stock, categoryIds} = createProductDto
    const product = await this.productRepositry.create({ title, price, description, stock })

    if(categoryIds){
      const categories = await this.categoryRepositry.findBy({id: In(categoryIds)})
      product.categories = categories;
    }

    return await this.productRepositry.save(product)
  }

  async findAll() :Promise<Product[]> {
    return this.productRepositry.find({relations: ['categories']});
  }


  async findOne(id: number): Promise<Product>{
    const product = await this.productRepositry.findOne({where: {id: id}, relations:['categories']})
    if(!product) {
      throw new NotFoundException("Product not found");
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto){
    const { title, price, description , stock, categoryIds} = updateProductDto;

    const product= await this.findOne(id);

    if(title) product.title = title;
    if(price) product.price = price;
    if(description) product.description;
    if(stock) product.stock;

    if(categoryIds){
      const categories = await this.categoryRepositry.findBy({id: In(categoryIds)})
      product.categories = categories;
    }

    return await this.productRepositry.save(product)
  }

}
