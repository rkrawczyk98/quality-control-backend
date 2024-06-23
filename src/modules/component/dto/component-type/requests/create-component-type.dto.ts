import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateComponentTypeDto {
  @ApiProperty({ description: 'Name of the component type' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
