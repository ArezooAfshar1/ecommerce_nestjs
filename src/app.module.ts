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
import { OrdersModule } from './orders/orders.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGaurd } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    //Config
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
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
    OrdersModule,
    TasksModule
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGaurd
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard
  }

],

})
export class AppModule {
  configure( consumer: MiddlewareConsumer){
    consumer
    .apply(LoggerMiddleware)
    .forRoutes("*")
  }
}
