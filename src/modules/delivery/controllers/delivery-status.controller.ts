import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DeliveryStatusService } from '../services/delivery-status.service';
import {
  CreateDeliveryStatusDto,
  UpdateDeliveryStatusDto,
  DeliveryStatusResponseDto,
} from '../dto/delivery-status';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('delivery-statuses')
@ApiBearerAuth()
@Controller('delivery-statuses')
@UseGuards(JwtAuthGuard)
export class DeliveryStatusController {
  constructor(private readonly deliveryStatusService: DeliveryStatusService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new delivery status' })
  @ApiResponse({
    status: 201,
    description: 'The delivery status has been successfully created.',
    type: DeliveryStatusResponseDto,
  })
  async create(
    @Body() createDeliveryStatusDto: CreateDeliveryStatusDto,
  ): Promise<DeliveryStatusResponseDto> {
    return this.deliveryStatusService.create(createDeliveryStatusDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a delivery status by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a delivery status.',
    type: DeliveryStatusResponseDto,
  })
  async findOne(@Param('id') id: number): Promise<DeliveryStatusResponseDto> {
    return this.deliveryStatusService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all delivery statuses' })
  @ApiResponse({
    status: 200,
    description: 'Return a delivery status.',
    type: DeliveryStatusResponseDto,
  })
  async find(): Promise<DeliveryStatusResponseDto[]> {
    return this.deliveryStatusService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a delivery status' })
  @ApiResponse({
    status: 200,
    description: 'The delivery status has been successfully updated.',
    type: DeliveryStatusResponseDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateDeliveryStatusDto: UpdateDeliveryStatusDto,
  ): Promise<DeliveryStatusResponseDto> {
    return this.deliveryStatusService.update(id, updateDeliveryStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a delivery status' })
  @ApiResponse({
    status: 204,
    description: 'The delivery status has been successfully deleted.',
  })
  async remove(@Param('id') id: number): Promise<void> {
    return this.deliveryStatusService.remove(id);
  }
}
