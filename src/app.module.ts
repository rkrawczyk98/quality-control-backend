import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import {
  AuthModule,
  UserModule,
  ComponentModule,
  CustomerModule,
  DeliveryModule,
  WarehouseModule,
} from './modules';
import * as dotenv from 'dotenv';
// import { ResponseDateFormatInterceptor } from './common/interceptors/response-date-format.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
dotenv.config();

@Module({
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: ResponseDateFormatInterceptor,
  //   },
  // ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: configService.get<any>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('database.synchronize', false),
      }),
    }),
    AuthModule,
    UserModule,
    ComponentModule,
    CustomerModule,
    DeliveryModule,
    WarehouseModule,
  ],
})
export class AppModule {}
