import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateWarehousePositionDto {
  @ApiProperty({
    description: 'The new name of the warehouse position',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    description: 'The new warehouse ID this position belongs to',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly warehouseId?: number;
}
