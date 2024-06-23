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
import { ComponentSubcomponentService } from '../services/component-subcomponent.service';
import {
  CreateComponentSubcomponentDto,
  UpdateComponentSubcomponentDto,
  ComponentSubcomponentResponseDto,
} from '../dto/component-subcomponent';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { GetUser } from '../../../common/decorators/user.decorator';

@ApiTags('component-subcomponents')
@ApiBearerAuth()
@Controller('component-subcomponents')
@UseGuards(JwtAuthGuard)
export class ComponentSubcomponentController {
  constructor(private readonly service: ComponentSubcomponentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new component-subcomponent relationship' })
  @ApiResponse({ status: 201, type: ComponentSubcomponentResponseDto })
  create(@Body() createDto: CreateComponentSubcomponentDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all component-subcomponent relationships' })
  @ApiResponse({ status: 200, type: [ComponentSubcomponentResponseDto] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a component-subcomponent relationship by id' })
  @ApiResponse({ status: 200, type: ComponentSubcomponentResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a component-subcomponent relationship' })
  @ApiResponse({ status: 200, type: ComponentSubcomponentResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateComponentSubcomponentDto,
    @GetUser() user: any
  ) {
    return this.service.update(id, updateDto, user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a component-subcomponent relationship' })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
