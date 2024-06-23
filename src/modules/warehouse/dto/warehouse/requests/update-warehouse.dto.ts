import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateWarehouseDto {
  @ApiProperty({
    description: 'The new name of the warehouse',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly name?: string;
}
