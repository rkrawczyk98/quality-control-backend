import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteWarehousePositionDto {
  @ApiProperty({ description: 'The ID of the warehouse to be deleted' })
  @IsNumber()
  readonly id: number;
}
