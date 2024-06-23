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
import { ComponentTypeService } from '../services/component-type.service';
import {
  CreateComponentTypeDto,
  UpdateComponentTypeDto,
  ComponentTypeResponseDto,
} from '../dto/component-type';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('component-types')
@ApiBearerAuth()
@Controller('component-types')
@UseGuards(JwtAuthGuard)
export class ComponentTypeController {
  constructor(private readonly componentTypeService: ComponentTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new component type' })
  @ApiResponse({ status: 201, type: ComponentTypeResponseDto })
  create(@Body() createComponentTypeDto: CreateComponentTypeDto) {
    return this.componentTypeService.create(createComponentTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all component types' })
  @ApiResponse({ status: 200, type: [ComponentTypeResponseDto] })
  findAll() {
    return this.componentTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a component type by id' })
  @ApiResponse({ status: 200, type: ComponentTypeResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.componentTypeService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a component type' })
  @ApiResponse({ status: 200, type: ComponentTypeResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComponentTypeDto: UpdateComponentTypeDto,
  ) {
    return this.componentTypeService.update(id, updateComponentTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a component type' })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.componentTypeService.remove(id);
  }
}
