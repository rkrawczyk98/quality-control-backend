import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryStatusDto {
  @ApiProperty({ description: 'Name of the delivery status' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
