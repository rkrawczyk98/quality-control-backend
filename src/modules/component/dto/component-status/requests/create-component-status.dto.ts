import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateComponentStatusDto {
  @ApiProperty({ description: 'Unique name of the component status' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Flag checking whether the component status allows setting an external number' })
  @IsNotEmpty()
  @IsBoolean()
  readonly isCountedForShipping: boolean;
}
