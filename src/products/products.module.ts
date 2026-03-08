import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { LoggerMiddleware } from 'src/middlewares/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {
  // configure( consumer: MiddlewareConsumer){
  //   consumer
  //   .apply(LoggerMiddleware)
  //   .forRoutes(
  //     { path: 'products', method: RequestMethod.POST },
  //     { path: 'products/:id', method: RequestMethod.GET }
  //   )
  // }
}
