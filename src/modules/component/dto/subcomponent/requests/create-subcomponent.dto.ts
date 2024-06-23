import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateSubcomponentDto {
  @ApiProperty({ description: 'Unique name of the subcomponent' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'ID of the component type associated with the subcomponent',
  })
  @IsNumber()
  readonly componentTypeId: number;

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
