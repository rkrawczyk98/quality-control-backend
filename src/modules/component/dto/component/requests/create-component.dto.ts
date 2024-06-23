import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateComponentDto {

  @ApiProperty({ description: 'GL number of the component' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  // @ApiProperty({ description: 'ID of the component type' })
  // @IsNumber()
  // readonly componentTypeId: number;

  @ApiProperty({
    description: 'Component inspection date',
    required: false,
  })
  @IsOptional()
  readonly controlDate: Date;

  @ApiProperty({
    description: 'Component production date',
    required: false,
  })
  @IsOptional()
  readonly productionDate: Date;

  @ApiProperty({
    description: 'ID of the delivery associated with the component',
    required: true,
  })
  @IsNumber()
  @IsOptional()
  readonly deliveryId?: number;

  @ApiProperty({
    description: 'Size of the component',
    required: true,
  })
  @IsNumber()
  @IsOptional()
  readonly size: number;

  // @ApiProperty({
  //   description: 'ID of the warehouse where the component is stored',
  // })
  // @IsNumber()
  // readonly warehouseId: number;

  // @ApiProperty({
  //   description: 'ID of the warehouse position where the component is stored',
  // })
  // @IsNumber()
  // readonly warehousePositionId: number;
}
