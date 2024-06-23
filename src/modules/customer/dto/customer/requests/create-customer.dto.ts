import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'The name of the customer',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
