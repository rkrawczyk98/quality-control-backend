import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteDeliveryDto {
  @ApiProperty({
    description: 'The unique identifier of the delivery to delete',
    example: 1,
  })
  @IsNumber()
  readonly id: number;
}
