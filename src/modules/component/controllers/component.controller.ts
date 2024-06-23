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
import { ComponentService } from '../services/component.service';
import {
  CreateComponentDto,
  UpdateComponentDto,
  ComponentResponseDto,
} from '../dto/component';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { GetUser } from '../../../common/decorators/user.decorator';

@ApiTags('components')
@ApiBearerAuth()
@Controller('components')
@UseGuards(JwtAuthGuard)
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new component' })
  @ApiResponse({ status: 201, type: ComponentResponseDto })
  create(@Body() createComponentDto: CreateComponentDto, @GetUser() user: any) {
    return this.componentService.create(createComponentDto, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all components' })
  @ApiResponse({ status: 200, type: [ComponentResponseDto] })
  findAll() {
    return this.componentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a component by id' })
  @ApiResponse({ status: 200, type: ComponentResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.componentService.findOne(id);
  }

  @Get('/byDeliveryId/:deliveryId')
  @ApiOperation({ summary: 'Get components by delivery id' })
  @ApiResponse({ status: 200, type: [ComponentResponseDto] })
  async findForDeliveryId(
    @Param('deliveryId', ParseIntPipe) deliveryId: number,
  ): Promise<ComponentResponseDto[]> {
    const components =
      await this.componentService.findAllForDelivery(deliveryId);
    return await Promise.all(
      components.map(async (component) =>
        this.componentService.componentToResponseDto(component),
      ),
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a component' })
  @ApiResponse({ status: 200, type: ComponentResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComponentDto: UpdateComponentDto,
    @GetUser() user: any,
  ) {
    return this.componentService.update(id, updateComponentDto, user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a component' })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.componentService.remove(id);
  }
}
