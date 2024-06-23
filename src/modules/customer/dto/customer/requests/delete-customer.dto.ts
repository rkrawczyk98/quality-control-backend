import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteCustomerDto {
  @ApiProperty({
    description: 'The ID of the customer to delete',
    example: 1,
  })
  @IsNumber()
  readonly id: number;
}
