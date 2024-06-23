import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({ description: 'The name of the warehouse' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
