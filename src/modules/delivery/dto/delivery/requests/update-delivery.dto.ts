import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateDeliveryDto {
  @ApiProperty({ description: 'Unique delivery number', required: false })
  @IsString()
  @IsOptional()
  readonly number?: string;

  @ApiProperty({ description: 'ID of the delivery status', required: false })
  @IsNumber()
  @IsOptional()
  readonly statusId?: number;

  @ApiProperty({
    description: 'ID of the customer associated with the delivery',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly customerId?: number;

  @ApiProperty({
    description: 'Date of the delivery',
  })
  @IsOptional()
  readonly deliveryDate: number;
}
