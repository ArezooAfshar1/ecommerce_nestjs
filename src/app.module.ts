import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';


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
      entities: [__dirname + '/**/entities/*.entity{.ts, .js}'],
      synchronize: true
    }),
    // Modules
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
