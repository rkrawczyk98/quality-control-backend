import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { WarehousePositionService } from '../services/warehouse-position.service';
import { CreateWarehousePositionDto } from '../dto/warehouse-position/requests/create-warehouse-position.dto';
import { UpdateWarehousePositionDto } from '../dto/warehouse-position/requests/update-warehouse-position.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { WarehousePositionResponseDto } from '../dto/warehouse-position/responses/warehouse-position-response.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('warehouse-positions')
@ApiBearerAuth()
@Controller('warehouse-positions')
@UseGuards(JwtAuthGuard)
export class WarehousePositionController {
  constructor(
    private readonly warehousePositionService: WarehousePositionService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new warehouse position' })
  @ApiResponse({ status: 201, type: WarehousePositionResponseDto })
  create(@Body() createWarehousePositionDto: CreateWarehousePositionDto) {
    return this.warehousePositionService.create(createWarehousePositionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all warehouse positions' })
  @ApiResponse({ status: 200, type: [WarehousePositionResponseDto] })
  findAll() {
    return this.warehousePositionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a warehouse position by id' })
  @ApiResponse({ status: 200, type: WarehousePositionResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.warehousePositionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a warehouse position' })
  @ApiResponse({ status: 200, type: WarehousePositionResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWarehousePositionDto: UpdateWarehousePositionDto,
  ) {
    return this.warehousePositionService.update(id, updateWarehousePositionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a warehouse position' })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.warehousePositionService.remove(id);
  }
}
