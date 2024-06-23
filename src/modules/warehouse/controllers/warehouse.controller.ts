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
import { WarehouseService } from '../services/warehouse.service';
import { CreateWarehouseDto } from '../dto/warehouse/requests/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/warehouse/requests/update-warehouse.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { WarehouseResponseDto } from '../dto/warehouse/responses/warehouse-response.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('warehouses')
@ApiBearerAuth()
@Controller('warehouses')
@UseGuards(JwtAuthGuard)
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new warehouse' })
  @ApiResponse({ status: 201, type: WarehouseResponseDto })
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.create(createWarehouseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all warehouses' })
  @ApiResponse({ status: 200, type: [WarehouseResponseDto] })
  findAll() {
    return this.warehouseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a warehouse by id' })
  @ApiResponse({ status: 200, type: WarehouseResponseDto })
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a warehouse' })
  @ApiResponse({ status: 200, type: WarehouseResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    return this.warehouseService.update(+id, updateWarehouseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a warehouse' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(+id);
  }
}
