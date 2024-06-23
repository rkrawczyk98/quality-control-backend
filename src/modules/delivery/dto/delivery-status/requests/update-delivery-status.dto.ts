import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDeliveryStatusDto {
  @ApiProperty({
    description: 'New name of the delivery status',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly name?: string;
}
