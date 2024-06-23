import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DeliveryService } from '../services/delivery.service';
import {
  CreateDeliveryDto,
  UpdateDeliveryDto,
  DeliveryResponseDto,
} from '../dto/delivery';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Delivery } from '../entities';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { GetUser } from '../../../common/decorators/user.decorator';
import { DeliveryStatusService } from '../services';
import { CustomerService } from '../../customer/services/customer.service';
import { UserService } from '../../../modules/user/services';
import { ComponentTypeService } from '../../../modules/component/services';

@ApiTags('deliveries')
@ApiBearerAuth()
@Controller('deliveries')
@UseGuards(JwtAuthGuard)
export class DeliveryController {
  constructor(
    private readonly userService: UserService,
    private readonly componentTypeService: ComponentTypeService,
    private readonly deliveryService: DeliveryService,
    private readonly deliveryStatusService: DeliveryStatusService,
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The delivery has been successfully created.',
    type: DeliveryResponseDto,
  })
  async create(
    @Body() createDeliveryDto: CreateDeliveryDto,
    @GetUser() user: any,
  ): Promise<DeliveryResponseDto> {
    const delivery = await this.deliveryService.createDelivery(
      createDeliveryDto,
      user.userId,
    );
    return await this.mapToResponseDto(delivery);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The delivery details.',
    type: DeliveryResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<DeliveryResponseDto> {
    const delivery = await this.deliveryService.getDeliveryById(+id);
    return await this.mapToResponseDto(delivery);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The all deliveries.',
    type: DeliveryResponseDto,
  })
  async find(): Promise<DeliveryResponseDto[]> {
    const deliveries = await this.deliveryService.getAllDeliveries();
    return await this.mapToResponseDtos(deliveries);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The delivery has been successfully updated.',
    type: DeliveryResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<DeliveryResponseDto> {
    const delivery = await this.deliveryService.updateDelivery(
      +id,
      updateDeliveryDto,
    );
    return await this.mapToResponseDto(delivery);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The delivery has been successfully deleted.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deliveryService.deleteDelivery(+id);
  }

  private async mapToResponseDto(
    delivery: Delivery,
  ): Promise<DeliveryResponseDto> {
    const status = await this.deliveryStatusService.findOne(delivery.status.id);
    const customer = await this.customerService.findOne(delivery.customer.id);
    const createdByUser = await this.userService.findByUserId(delivery.createdByUserId);
    const componentType = await this.componentTypeService.findOne(delivery.componentTypeId);
    return {
      id: delivery.id,
      number: delivery.number,
      createdByUser: createdByUser ? {
        id: createdByUser.id,
        username: createdByUser.username
      } : null,
      componentType: componentType ? {
        id: componentType.id,
        name: componentType.name
      } : null,
      status: status
        ? {
            id: status.id,
            name: status.name,
          }
        : null,
      customer: customer
        ? {
            id: customer.id,
            name: customer.name,
          }
        : null,
      deliveryDate: delivery.deliveryDate,
      creationDate: delivery.creationDate,
      lastModified: delivery.lastModified,
      deletedAt: delivery.deletedAt,
    };
  }

  private async mapToResponseDtos(
    deliveries: Delivery[],
  ): Promise<DeliveryResponseDto[]> {
    const dtos = await Promise.all(
      deliveries.map(async (delivery) => await this.mapToResponseDto(delivery)),
    );
    return dtos;
  }
}
