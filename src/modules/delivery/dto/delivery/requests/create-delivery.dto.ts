import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({ description: 'ID of the component type' })
  @IsNumber()
  @IsNotEmpty()
  readonly componentTypeId: number;

  @ApiProperty({
    description: 'ID of the customer associated with the delivery',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly customerId: number;

  @ApiProperty({
    description: 'Date of the delivery',
  })
  @IsNotEmpty()
  readonly deliveryDate: number;
}
