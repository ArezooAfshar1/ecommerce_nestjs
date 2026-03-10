import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { BookmarkProduct } from './entities/bookmark-product.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepositry: Repository<Product>,

    @InjectRepository(BookmarkProduct)
    private readonly bookmarkProductRepositry: Repository<BookmarkProduct>,

    @InjectRepository(Category)
    private readonly categoryRepositry: Repository<Category>,

    private readonly userService: UsersService
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { title, price, description, stock, categoryIds } = createProductDto;
    const product = await this.productRepositry.create({
      title,
      price,
      description,
      stock,
    });

    if (categoryIds) {
      const categories = await this.categoryRepositry.findBy({
        id: In(categoryIds),
      });
      product.categories = categories;
    }

    return await this.productRepositry.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepositry.find({ relations: ['categories'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepositry.findOne({
      where: { id: id },
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { title, price, description, stock, categoryIds } = updateProductDto;

    const product = await this.findOne(id);

    if (title) product.title = title;
    if (price) product.price = price;
    if (description) product.description;
    if (stock) product.stock;

    if (categoryIds) {
      const categories = await this.categoryRepositry.findBy({
        id: In(categoryIds),
      });
      product.categories = categories;
    }

    return await this.productRepositry.save(product);
  }

  async toggleBookmark(userId: number, productId: number) {

    const user = await this.userService.findOne(userId)
    const product = await this.productRepositry.findOne({ where: { id: productId }})

    if( !user || !product ){
      throw new Error("کاربر یا محصول یافت نشد")
    }

    const existingBookmark = await this.bookmarkProductRepositry.findOne({
      where: {
        user: {id: user.id},
        product: {id: product.id}
        }
    })
    if (existingBookmark) {
      await this.bookmarkProductRepositry.remove(existingBookmark)
    }else{
      
      const newBookmark = this.bookmarkProductRepositry.create({
        product: product,
        user: user
      });

      return await this.bookmarkProductRepositry.save(newBookmark)
    }
  }

  async addItenToBasket(userId: number, productId: number){
    const product = await this.productRepositry.findOne({where: {id: productId}})
    return await this.userService.addProductToBasket(userId, product)
    
  }

    async removeProductFromBasket(userId: number, productId: number){
    const product = await this.productRepositry.findOne({where: {id: productId}})
    return await this.userService.removeProductFromBasket(userId, product)
  }
}
