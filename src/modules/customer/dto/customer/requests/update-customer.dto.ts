import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty({
    description: 'The new name of the customer',
    example: 'Jane Doe',
    required: false
  })
  @IsString()
  @IsOptional()
  readonly name?: string;
}
