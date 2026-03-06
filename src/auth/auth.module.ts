import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET_KEY'),
            signOptions: { expiresIn: configService.get('JWT_EXPIRATION')}
        })
    }),
],
  providers: [
    AuthService,
    JwtStrategy
  ],

})
export class AuthModule {}
