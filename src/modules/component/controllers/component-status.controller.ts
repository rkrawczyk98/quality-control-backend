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
import { ComponentStatusService } from '../services/component-status.service';
import {
  CreateComponentStatusDto,
  ComponentStatusResponseDto,
  UpdateComponentStatusDto,
} from '../dto/component-status';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('component-statuses')
@ApiBearerAuth()
@Controller('component-statuses')
@UseGuards(JwtAuthGuard)
export class ComponentStatusController {
  constructor(
    private readonly componentStatusService: ComponentStatusService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new component status' })
  @ApiResponse({ status: 201, type: ComponentStatusResponseDto })
  create(@Body() createComponentStatusDto: CreateComponentStatusDto) {
    return this.componentStatusService.create(createComponentStatusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all component statuses' })
  @ApiResponse({ status: 200, type: [ComponentStatusResponseDto] })
  findAll() {
    return this.componentStatusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a component status by id' })
  @ApiResponse({ status: 200, type: ComponentStatusResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.componentStatusService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a component status' })
  @ApiResponse({ status: 200, type: ComponentStatusResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComponentStatusDto: UpdateComponentStatusDto,
  ) {
    return this.componentStatusService.update(id, updateComponentStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a component status' })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.componentStatusService.remove(id);
  }
}
