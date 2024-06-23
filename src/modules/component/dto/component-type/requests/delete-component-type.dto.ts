import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteComponentTypeDto {
  @ApiProperty({ description: 'The ID of the component type to be deleted' })
  @IsNumber()
  readonly id: number;
}