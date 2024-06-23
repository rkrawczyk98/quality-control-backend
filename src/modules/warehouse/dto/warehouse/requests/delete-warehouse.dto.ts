import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteWarehouseDto {
  @ApiProperty({ description: 'The ID of the warehouse to be deleted' })
  @IsNumber()
  readonly id: number;
}
