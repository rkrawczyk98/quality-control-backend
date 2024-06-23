import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWarehousePositionDto {
  @ApiProperty({ description: 'The name of the warehouse position' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'The ID of the warehouse this position belongs to',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly warehouseId: number;
}
