import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateComponentStatusDto {
  @ApiProperty({ description: 'New name of the component status', required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;
  
  @ApiProperty({ description: 'Flag checking whether the component status allows setting an external number' })
  @IsOptional()
  @IsBoolean()
  readonly isCountedForShipping?: boolean;
}
