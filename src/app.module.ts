import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { TicketsModule } from './tickets/tickets.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { BodyLoggerMiddleware } from './middlewares/body-logger/body-logger.middleware';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [
    //Config
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // DB Connection
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true
    }),
    // Modules
    UsersModule,
    AuthModule,
    AddressModule,
    TicketsModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure( consumer: MiddlewareConsumer){
    consumer
    .apply(LoggerMiddleware, BodyLoggerMiddleware)
    .forRoutes("*")
  }
}
