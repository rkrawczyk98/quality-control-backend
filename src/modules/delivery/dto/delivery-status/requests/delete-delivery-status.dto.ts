import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteDeliveryStatusDto {
  @ApiProperty({
    description: 'The unique identifier of the delivery status to delete',
    example: 2,
  })
  @IsNumber()
  readonly id: number;
}
