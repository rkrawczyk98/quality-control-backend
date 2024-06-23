import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateComponentTypeDto {
  @ApiProperty({ description: 'New name of the component type', required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;
}
