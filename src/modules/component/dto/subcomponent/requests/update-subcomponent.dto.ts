import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class UpdateSubcomponentDto {
  @ApiProperty({ description: 'New name of the subcomponent', required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    description:
      'New ID of the component type associated with the subcomponent',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly componentTypeId?: number;

  @ApiProperty({
    description: 'ID of the component type associated with the subcomponent',
  })
  @IsBoolean()
  readonly isISS: boolean;

  @ApiProperty({
    description:
      'Is a flag that determines if this subcomponent is activity or just a casual component',
  })
  @IsNotEmpty()
  @IsBoolean()
  readonly isActivity: boolean;
}
