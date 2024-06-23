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
import { SubcomponentService } from '../services/subcomponent.service';
import {
  CreateSubcomponentDto,
  UpdateSubcomponentDto,
  SubcomponentResponseDto,
} from '../dto/subcomponent';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('subcomponents')
@ApiBearerAuth()
@Controller('subcomponents')
@UseGuards(JwtAuthGuard)
export class SubcomponentController {
  constructor(private readonly subcomponentService: SubcomponentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subcomponent' })
  @ApiResponse({ status: 201, type: SubcomponentResponseDto })
  create(@Body() createSubcomponentDto: CreateSubcomponentDto) {
    return this.subcomponentService.create(createSubcomponentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subcomponents' })
  @ApiResponse({ status: 200, type: [SubcomponentResponseDto] })
  findAll() {
    return this.subcomponentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subcomponent by id' })
  @ApiResponse({ status: 200, type: SubcomponentResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subcomponentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a subcomponent' })
  @ApiResponse({ status: 200, type: SubcomponentResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubcomponentDto: UpdateSubcomponentDto,
  ) {
    return this.subcomponentService.update(id, updateSubcomponentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subcomponent' })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subcomponentService.remove(id);
  }
}
