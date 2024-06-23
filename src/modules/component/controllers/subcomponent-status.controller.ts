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
import { SubcomponentStatusService } from '../services/subcomponent-status.service';
import {
  CreateSubcomponentStatusDto,
  UpdateSubcomponentStatusDto,
  SubcomponentStatusResponseDto,
} from '../dto/subcomponent-status';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('subcomponent-statuses')
@ApiBearerAuth()
@Controller('subcomponent-statuses')
@UseGuards(JwtAuthGuard)
export class SubcomponentStatusController {
  constructor(
    private readonly subcomponentStatusService: SubcomponentStatusService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subcomponent status' })
  @ApiResponse({ status: 201, type: SubcomponentStatusResponseDto })
  create(@Body() createSubcomponentStatusDto: CreateSubcomponentStatusDto) {
    return this.subcomponentStatusService.create(createSubcomponentStatusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subcomponent statuses' })
  @ApiResponse({ status: 200, type: [SubcomponentStatusResponseDto] })
  findAll() {
    return this.subcomponentStatusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subcomponent status by id' })
  @ApiResponse({ status: 200, type: SubcomponentStatusResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subcomponentStatusService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a subcomponent status' })
  @ApiResponse({ status: 200, type: SubcomponentStatusResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubcomponentStatusDto: UpdateSubcomponentStatusDto,
  ) {
    return this.subcomponentStatusService.update(
      id,
      updateSubcomponentStatusDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subcomponent status' })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subcomponentStatusService.remove(id);
  }
}
