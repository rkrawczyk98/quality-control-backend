import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateComponentDto {
  @ApiProperty({
    description: 'ID of status you want to change to',
  })
  @IsOptional()
  @IsNumber()
  readonly statusId: number;

  @ApiProperty({description: 'Component shipping date'})
  @IsOptional()
  @IsDateString()
  readonly shippingDate: Date;

  @ApiProperty({
    description: 'Component inspection date',
  })
  @IsOptional()
  @IsDateString()
  readonly controlDate: Date;

  @ApiProperty({
    description: 'Component scrapping date',
  })
  @IsOptional()
  @IsDateString()
  readonly scrappedAt: Date;

  @ApiProperty({
    description: 'Component production date',
  })
  @IsOptional()
  @IsDateString()
  readonly productionDate: Date;
}
