import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryController, DeliveryStatusController } from './controllers';
import { Delivery, DeliveryStatus } from './entities';
import { DeliveryService, DeliveryStatusService } from './services';
import { CustomerModule } from '../customer/customer.module';
import { UserModule } from '../user/user.module';
import { ComponentModule } from '../component/component.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery, DeliveryStatus]),
    CustomerModule,
    UserModule,
    ComponentModule
  ],
  controllers: [DeliveryController, DeliveryStatusController],
  providers: [DeliveryService, DeliveryStatusService],
  exports: [DeliveryService, DeliveryStatusService],
})
export class DeliveryModule {}
